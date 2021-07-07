using System;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        
        public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _userAccessor = userAccessor;
            
            
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var currentUserId = _userAccessor.GetCurrentUsername();

            var role =  _context.AppUserRoleMasters
                    .Where(x => x.Title == "Admin" ).FirstOrDefault();
            if(role == null){
                throw new RestException(HttpStatusCode.OK, new { Error = "Admin user is null" });                
            }

            var appUserRole =  _context.AppUserRoles
                    .Where(x => x.UserId == currentUserId && x.AppUserRoleMasterId == role.Id )
                    .FirstOrDefault();

            if(appUserRole == null){
                //throw new RestException(HttpStatusCode.Unauthorized, new { Error = "Unauthorized" });   
                context.Fail();
            }
            else{
                 context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}