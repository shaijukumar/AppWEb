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
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Application._AppUserRoleMaster
{
    public class RemoveUserFromRole
    {
        public class Command : IRequest<bool>
        {
		    public string UserName { get; set; }
            public string RoleName { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserName).NotEmpty();
				RuleFor(x => x.RoleName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, bool>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private RoleManager<IdentityRole> _roleManager;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper, RoleManager<IdentityRole> roleMgr, UserManager<AppUser> userManager)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
                _roleManager = roleMgr;
                _userManager = userManager;
            }

            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {                
                if (!await _roleManager.RoleExistsAsync( request.RoleName)) {
                     throw new RestException(HttpStatusCode.OK, new { Error = $"Role {request.RoleName} not found." });
                }
                                   
                var user = await _context.Users.FirstOrDefaultAsync( u => u.UserName == request.UserName  );                     
                if (user == null){
                     throw new RestException(HttpStatusCode.OK, new { Error = $"User {request.UserName} not found" });
                }
                
                   
                var v = await _userManager.RemoveFromRoleAsync(user, request.RoleName );
                                              
                try{
                    var success = await _context.SaveChangesAsync() > 0;
                    return true;
                } 
                catch(Exception ex){
                     throw new RestException(HttpStatusCode.OK, new { Error = $"Problem saving changes. {ex.Message}. {ex.InnerException.Message}." });
                }                        

                throw new Exception("Problem saving changes");
            }
        }
    }
}
