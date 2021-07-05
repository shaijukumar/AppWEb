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



namespace Application._AppNotificationsMaster
{
    public class Edit
    {
        public class Command : IRequest<AppNotificationsMasterDto>
        {            
            
		public int Id { get; set; }
		public string Subject { get; set; }
		public string Body { get; set; }
		public DateTime NextReminderTime { get; set; }
		public int NoOfReminders { get; set; }
		public string Frequency { get; set; }
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

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
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
                //var test = request.test;

                var appNotificationsMaster = await _context.AppNotificationsMasters
                    .FindAsync(request.Id);
                if (appNotificationsMaster == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppNotificationsMaster = "Not found" });

				appNotificationsMaster.Subject  = request.Subject ?? appNotificationsMaster.Subject;
				appNotificationsMaster.Body  = request.Body ?? appNotificationsMaster.Body;
				appNotificationsMaster.NextReminderTime  = request.NextReminderTime; // ?? appNotificationsMaster.NextReminderTime;
				appNotificationsMaster.NoOfReminders  = request.NoOfReminders; // ?? appNotificationsMaster.NoOfReminders;
				appNotificationsMaster.Frequency  = request.Frequency; // ?? appNotificationsMaster.Frequency;
				appNotificationsMaster.Type  = request.Type ?? appNotificationsMaster.Type;
				appNotificationsMaster.DataId  = request.DataId; // ?? appNotificationsMaster.DataId;
				appNotificationsMaster.ToUsers  = request.ToUsers ?? appNotificationsMaster.ToUsers;
				appNotificationsMaster.CCUsers  = request.CCUsers ?? appNotificationsMaster.CCUsers;
				appNotificationsMaster.ToGroups  = request.ToGroups ?? appNotificationsMaster.ToGroups;
				appNotificationsMaster.CCGroups  = request.CCGroups ?? appNotificationsMaster.CCGroups;
				
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<AppNotificationsMaster, AppNotificationsMasterDto>(appNotificationsMaster);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
