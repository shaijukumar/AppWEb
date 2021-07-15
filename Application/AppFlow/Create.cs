using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using System.Net;

namespace Application._AppFlow
{
    public class Create
    {
        public class Command : IRequest<AppFlowDto>
        {
		    public string Title { get; set; }
            public int TableId { get; set; }            
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				RuleFor(x => x.TableId).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, AppFlowDto>
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

            public async Task<AppFlowDto> Handle(Command request, CancellationToken cancellationToken)
            { 
                var table = await _context.AppTableMasters
                        .Where( x => x.Id == request.TableId )
                        .FirstOrDefaultAsync();    
                if( table == null ){
                    throw new RestException(HttpStatusCode.OK, new { Error = $"Table not found." }); 
                }            
                                                  
                var appFlow = new AppFlow
                {
					Title  = request.Title                  
                };
                appFlow.Table = table; 

                _context.AppFlows.Add(appFlow);
              
                try{                   
                    var success = await _context.SaveChangesAsync() > 0;

                    if (success)
                    {
                        return _mapper.Map <AppFlow, AppFlowDto>(appFlow);                      
                    } 
                    else{
                       throw new RestException(HttpStatusCode.OK, new { Error = $"No rows updated" });  
                    }
                } 
                catch(Exception ex){
                     throw new RestException(HttpStatusCode.OK, new { Error = $"Problem saving changes. {ex.Message}. {ex.InnerException.Message}." });
                }             

                throw new Exception("Problem saving changes");
}
        }
    }
}
