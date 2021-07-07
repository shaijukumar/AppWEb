using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Persistence;
namespace Application._AppNotifications
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

                var appNotifications = await _context.AppNotificationss
                    .FindAsync(request.Id);
                if (appNotifications == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppNotifications = "Not found" });

				appNotifications.ReadStatus  = true;
                var success = await _context.SaveChangesAsync() > 0;

                // var appNotifications = await _context.AppNotificationss
                //     .FindAsync(request.Id);
                // if (appNotifications == null)
                //     throw new RestException(HttpStatusCode.NotFound, new { AppNotifications = "Not found" });

                // var CurrentUsername = _userAccessor.GetCurrentUsername();

                // _context.Remove(appNotifications);
				// var success = await _context.SaveChangesAsync() > 0;
				if (success) return Unit.Value;

                throw new Exception("Problem saving changes");

            }

        }

    }
}
