using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._AppUserRole
{
    public class Create
    {
        public class Command : IRequest<AppUserRoleDto>
        {

		    public string UserId { get; set; }
		    public int AppUserRoleMasterId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserId).NotEmpty();
				RuleFor(x => x.AppUserRoleMasterId).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppUserRoleDto>
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

            public async Task<AppUserRoleDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                var appUserRole = new AppUserRole
                {
					UserId  = request.UserId,
					AppUserRoleMasterId  = request.AppUserRoleMasterId                  
                };

                _context.AppUserRoles.Add(appUserRole);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppUserRole, AppUserRoleDto>(appUserRole);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
