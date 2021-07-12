using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application._AppTableMaster
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
                 if( await _context.AppDatas.AnyAsync( t => t.TableId == request.Id ) ){
                    throw new RestException(HttpStatusCode.OK, new { Error = $"Data exists for this table." });
                }

                if( await _context.AppColumnMasters.AnyAsync( t => t.TableID == request.Id ) ){
                    throw new RestException(HttpStatusCode.OK, new { Error = $"Columns exists for this table." });
                }
                                
                var appTableMaster = await _context.AppTableMasters
                    .FindAsync(request.Id);
                if (appTableMaster == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppTableMaster = "Not found" });

                var CurrentUsername = _userAccessor.GetCurrentUsername();

                _context.Remove(appTableMaster);

                try{
                    var success = await _context.SaveChangesAsync() > 0;
                    if (success) 
                        return Unit.Value;
                    else    
                        throw new RestException(HttpStatusCode.OK, new { Error = $"No dows updated." });
                } 
                catch(Exception ex){
                    throw new RestException(HttpStatusCode.OK, new { Error = $"Problem saving changes. {ex.Message}. {ex.InnerException.Message}." });
                } 
                				
                throw new Exception("Problem saving changes");

            }

        }

    }
}
