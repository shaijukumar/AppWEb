using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;
using Application.Errors;
using System.Net;
using Microsoft.AspNetCore.Identity;

namespace Application._AppUserRoleMaster
{
    public class Create
    {
        public class Command : IRequest<AppUserRoleMasterDto>
        {

		public string Title { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppUserRoleMasterDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private RoleManager<IdentityRole> _roleManager;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper, RoleManager<IdentityRole> roleMgr)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
                _roleManager = roleMgr;

            }

            public async Task<AppUserRoleMasterDto> Handle(Command request, CancellationToken cancellationToken)
            {         

                if (!await _roleManager.RoleExistsAsync( request.Title)) {
                    var role = new IdentityRole();    
                    role.Name = request.Title;    
                    await _roleManager.CreateAsync(role);   
                    var toReturn = _mapper.Map <IdentityRole, AppUserRoleMasterDto>(role);
                    return toReturn;
                }   
                else{
                     throw new RestException(HttpStatusCode.OK, new { Error = $"Role {request.Title} alreday exists." });
                }                

                throw new Exception("Problem saving changes");
            }
        }
    }
}
