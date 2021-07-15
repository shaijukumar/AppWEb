using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application._AppStatusList
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
                var appActiionUsed = await _context.AppActions                    
                    .AnyAsync( x => x.ToStatusId == request.Id );
                if (appActiionUsed)
                     throw new RestException(HttpStatusCode.OK, new { Error = "Status already using in Status flow To status" });

                appActiionUsed = await _context.AppActions
                    .AnyAsync( x => x.FromStatusList.Any( s => s.Id ==  request.Id) );
                 if (appActiionUsed)
                     throw new RestException(HttpStatusCode.OK, new { Error = "Status already using in Status flow from status" });
                
                var appStatusList = await _context.AppStatusLists
                    .FindAsync(request.Id);
                if (appStatusList == null)
                    throw new RestException(HttpStatusCode.OK, new { Error = "Not found" });

                var CurrentUsername = _userAccessor.GetCurrentUsername();

                _context.Remove(appStatusList);
				var success = await _context.SaveChangesAsync() > 0;
				if (success) return Unit.Value;

                throw new Exception("Problem saving changes");

            }

        }

    }
}
