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



namespace Application._AppNotifications
{
    public class Edit
    {
        public class Command : IRequest<AppNotificationsDto>
        {            
            
		public int Id { get; set; }
		public int NotificationsMasterId { get; set; }
		public string UserId { get; set; }
		// public DateTime NextReminderTime { get; set; }
		// public int NoOfReminders { get; set; }
		public bool ReadStatus { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.NotificationsMasterId).NotEmpty();
				RuleFor(x => x.UserId).NotEmpty();
				// RuleFor(x => x.NextReminderTime).NotEmpty();
				// RuleFor(x => x.NoOfReminders).NotEmpty();
				
            }

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
            }
        }

        public class Handler : IRequestHandler<Command, AppNotificationsDto>
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

            public async Task<AppNotificationsDto> Handle(Command request, CancellationToken cancellationToken)
            {
                //var test = request.test;

                var appNotifications = await _context.AppNotificationss
                    .FindAsync(request.Id);
                if (appNotifications == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppNotifications = "Not found" });

				appNotifications.NotificationsMasterId  = request.NotificationsMasterId;// ?? appNotifications.NotificationsMasterId;
				appNotifications.UserId  = request.UserId ?? appNotifications.UserId;
				// appNotifications.NextReminderTime  = request.NextReminderTime;// ?? appNotifications.NextReminderTime;
				// appNotifications.NoOfReminders  = request.NoOfReminders;// ?? appNotifications.NoOfReminders;
				appNotifications.ReadStatus  = request.ReadStatus; // ?? appNotifications.ReadStatus;
				
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<AppNotifications, AppNotificationsDto>(appNotifications);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
