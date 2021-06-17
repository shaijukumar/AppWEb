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



namespace Application._AppUserRole
{
    public class Edit
    {
        public class Command : IRequest<AppUserRoleDto>
        {            
            
		public int Id { get; set; }
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

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
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
                //var test = request.test;

                var appUserRole = await _context.AppUserRoles
                    .FindAsync(request.Id);
                if (appUserRole == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppUserRole = "Not found" });

				appUserRole.UserId  = request.UserId; // ?? appUserRole.UserId;
				appUserRole.AppUserRoleMasterId  = request.AppUserRoleMasterId; // ?? appUserRole.AppUserRoleMasterId;
				
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<AppUserRole, AppUserRoleDto>(appUserRole);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
