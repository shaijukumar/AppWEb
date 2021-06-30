using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._AppNavigation
{
    public class Create
    {
        public class Command : IRequest<AppNavigationDto>
        {
            public string Title { get; set; }
            public string Path { get; set; }
            public string Icon { get; set; }
            public int Access { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				RuleFor(x => x.Path).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppNavigationDto>
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

            public async Task<AppNavigationDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                var appNavigation = new AppNavigation
                {
					Title  = request.Title,
					Path  = request.Path,
					Icon  = request.Icon,
					Access  = request.Access                  
                };

                _context.AppNavigations.Add(appNavigation);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppNavigation, AppNavigationDto>(appNavigation);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
