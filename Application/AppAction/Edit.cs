using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Persistence;
using Domain;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Application.AppEngine;

namespace Application._AppAction
{
    public class Edit
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

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
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
                catch{}

                var appAction = await _context.AppActions
                    .FindAsync(request.Id);
                if (appAction == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppAction = "Not found" });
                
                appAction.ToStatusId  = request.ToStatusId;

				appAction.Action  = request.Action ?? appAction.Action;
				appAction.ActionType  = request.ActionType ?? appAction.ActionType;
				appAction.WhenXml  = request.WhenXml ?? appAction.WhenXml;
				appAction.FlowId  = request.FlowId; // ?? appAction.FlowId;
				appAction.InitStatus  = request.InitStatus; // ?? appAction.InitStatus;
				appAction.TableId  = request.TableId; // ?? appAction.TableId;
				appAction.ActionXml  = request.ActionXml; // ?? appAction.ActionXml;

                

                

                appAction.FromStatusList.Clear();                
                foreach(var f in  request.FromStatusList){
                    var status = await _context.AppStatusLists
                    .Where( x => x.Id == f.Id )
                    .FirstOrDefaultAsync();

                    if( status != null ){
                         appAction.FromStatusList.Add(status);
                    }
                }
                //appAction.FromStatusList  = request.FromStatusList;

				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				//if (success)
				{
					var toReturn = _mapper.Map<AppAction, AppActionDto>(appAction);
					return toReturn;
				}

                throw new Exception("Problem saving changes");
            }
        }

    }
}
