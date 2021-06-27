using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._AppHistory
{
    public class Create
    {
        public class Command : IRequest<AppHistoryDto>
        {

		public string Action { get; set; }
		public int FromStage { get; set; }
		public int ToStage { get; set; }
		public string ActionBy { get; set; }
		public DateTime DateTime { get; set; }
		public string Comment { get; set; }
		public string Details1 { get; set; }
		public string Details2 { get; set; }
		public string Details3 { get; set; }
		public string Details4 { get; set; }
		public string Details5 { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Action).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppHistoryDto>
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

            public async Task<AppHistoryDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                var appHistory = new AppHistory
                {
					Action  = request.Action,
					FromStage  = request.FromStage,
					ToStage  = request.ToStage,
					ActionBy  = request.ActionBy,
					DateTime  = request.DateTime,
					Comment  = request.Comment,
					Details1  = request.Details1,
					Details2  = request.Details2,
					Details3  = request.Details3,
					Details4  = request.Details4,
					Details5  = request.Details5                  
                };

                _context.AppHistorys.Add(appHistory);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppHistory, AppHistoryDto>(appHistory);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
