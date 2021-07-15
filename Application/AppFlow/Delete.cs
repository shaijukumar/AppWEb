using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application._AppFlow
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var appActionUsed = await _context.AppActions                    
                    .AnyAsync( x => x.FlowId == request.Id );
                if (appActionUsed)
                     throw new RestException(HttpStatusCode.OK, new { Error = "Flow already using in Status flow To status" });
                     
                var appFlow = await _context.AppFlows
                    .FindAsync(request.Id);
                if (appFlow == null)
                    throw new RestException(HttpStatusCode.OK, new { Error = $"Not found" });                    

                
                _context.Remove(appFlow);
				
                try{                   
                    var success = await _context.SaveChangesAsync() > 0;
				    if (success) {
                        return Unit.Value; 
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
