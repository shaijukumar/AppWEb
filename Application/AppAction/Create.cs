using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;
using System.Collections.Generic;
using Application.AppEngine;

namespace Application._AppAction
{
    public class Create
    {
        public class Command : IRequest<AppActionDto>
        {
            public int Id { get; set; }                        
		    public virtual ICollection<AppStatusList> FromStatusList { get; set; } 							
            public int ToStatusId { get; set; }						
            public string Action { get; set; }
            public string ActionType { get; set; }
            public string WhenXml { get; set; }
            public int FlowId { get; set; }
            public bool InitStatus { get; set; }
            public int TableId { get; set; }
            public string ActionXml { get; set; }	
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Action).NotEmpty();
				RuleFor(x => x.ActionType).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppActionDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;

            }

            public async Task<AppActionDto> Handle(Command request, CancellationToken cancellationToken)
            {        
                try{
                    request.WhenXml = await XmlUpdate.UpdateXml(request.WhenXml, _context, true );
                    request.ActionXml = await XmlUpdate.UpdateXml(request.ActionXml, _context, true );
                }
                catch(Exception ex){

                }

               

                //ActionXml
                var appAction = new AppAction
                {
					ToStatusId  = request.ToStatusId,
                    ActionType  = request.ActionType,
                    WhenXml  = request.WhenXml,
					FlowId  = request.FlowId,
					InitStatus  = request.InitStatus,
					TableId  = request.TableId,
					ActionXml  = request.ActionXml,
                    //FromStatusList = request.FromStatusList  

                };

                _context.AppActions.Add(appAction);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppAction, AppActionDto>(appAction);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
