using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._AppUserAccess
{
    public class Create
    {
        public class Command : IRequest<AppUserAccessDto>
        {

		public string Title { get; set; }
		public string ActionScript { get; set; }
		public string Description { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				RuleFor(x => x.ActionScript).NotEmpty();
				RuleFor(x => x.Description).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppUserAccessDto>
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

            public async Task<AppUserAccessDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                var appUserAccess = new AppUserAccess
                {
					Title  = request.Title,
					ActionScript  = request.ActionScript,
					Description  = request.Description                  
                };

                _context.AppUserAccesss.Add(appUserAccess);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppUserAccess, AppUserAccessDto>(appUserAccess);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
