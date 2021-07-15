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
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Application._AppFlow
{
    public class Edit
    {
        public class Command : IRequest<AppFlowDto>
        {                        
            public int Id { get; set; }
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

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
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

                var appFlow = await _context.AppFlows
                    .FindAsync(request.Id);
                if (appFlow == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppFlow = "Not found" });

				appFlow.Title  = request.Title ?? appFlow.Title;
                appFlow.Table = table;
												
				// var success = await _context.SaveChangesAsync() > 0;                   				
				// if (success)
				// {
				// 	var toReturn = _mapper.Map<AppFlow, AppFlowDto>(appFlow);
				// 	return toReturn;
				// }

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
