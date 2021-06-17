using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._AppConfig
{
    public class Create
    {
        public class Command : IRequest<AppConfigDto>
        {

		public string Title { get; set; }
		public int Type { get; set; }
        public int Order { get; set; }                
		public string Det1 { get; set; }
		public string Det2 { get; set; }
		public string Det3 { get; set; }
		public string Det4 { get; set; }
		public string Det5 { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				RuleFor(x => x.Type).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppConfigDto>
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

            public async Task<AppConfigDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                var appConfig = new AppConfig
                {
					Title  = request.Title,
					Type  = request.Type,
                    Order = request.Order,
					Det1  = request.Det1,
					Det2  = request.Det2,
					Det3  = request.Det3,
					Det4  = request.Det4,
					Det5  = request.Det5                  
                };

                _context.AppConfigs.Add(appConfig);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppConfig, AppConfigDto>(appConfig);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
