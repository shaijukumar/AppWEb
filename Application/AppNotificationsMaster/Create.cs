using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._AppNotificationsMaster
{
    public class Create
    {
        public class Command : IRequest<AppNotificationsMasterDto>
        {

		public string Subject { get; set; }
		public string Body { get; set; }
		public DateTime NextReminderTime { get; set; }
		public int NoOfReminders { get; set; }
		public int Frequency { get; set; }
		public string Type { get; set; }
		public int DataId { get; set; }
		public string ToUsers { get; set; }
		public string CCUsers { get; set; }
		public string ToGroups { get; set; }
		public string CCGroups { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Subject).NotEmpty();
				RuleFor(x => x.Body).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppNotificationsMasterDto>
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

            public async Task<AppNotificationsMasterDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                var appNotificationsMaster = new AppNotificationsMaster
                {
					Subject  = request.Subject,
					Body  = request.Body,
					NextReminderTime  = request.NextReminderTime,
					NoOfReminders  = request.NoOfReminders,
					Frequency  = request.Frequency,
					Type  = request.Type,
					DataId  = request.DataId,
					ToUsers  = request.ToUsers,
					CCUsers  = request.CCUsers,
					ToGroups  = request.ToGroups,
					CCGroups  = request.CCGroups                  
                };

                _context.AppNotificationsMasters.Add(appNotificationsMaster);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppNotificationsMaster, AppNotificationsMasterDto>(appNotificationsMaster);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
