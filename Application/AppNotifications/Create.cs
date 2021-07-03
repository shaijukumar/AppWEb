using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._AppNotifications
{
    public class Create
    {
        public class Command : IRequest<AppNotificationsDto>
        {

		public int NotificationsMasterId { get; set; }
		public string UserId { get; set; }
		public DateTime NextReminderTime { get; set; }
		public int NoOfReminders { get; set; }
		public bool ReadStatus { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.NotificationsMasterId).NotEmpty();
				RuleFor(x => x.UserId).NotEmpty();
				RuleFor(x => x.NextReminderTime).NotEmpty();
				RuleFor(x => x.NoOfReminders).NotEmpty();
				
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
                var appNotifications = new AppNotifications
                {
					NotificationsMasterId  = request.NotificationsMasterId,
					UserId  = request.UserId,
					NextReminderTime  = request.NextReminderTime,
					NoOfReminders  = request.NoOfReminders,
					ReadStatus  = request.ReadStatus                  
                };

                _context.AppNotificationss.Add(appNotifications);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppNotifications, AppNotificationsDto>(appNotifications);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
