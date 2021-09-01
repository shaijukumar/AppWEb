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
using Microsoft.EntityFrameworkCore;
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
        private readonly UserManager<AppUser> _userManager;
        
        public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context, IUserAccessor userAccessor, UserManager<AppUser> userManager)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _userAccessor = userAccessor;
            _userManager = userManager;
            
        }

        //async Task<Dictionary<string, List<object>>>
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            AppUser user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
            var res =  await _userManager.IsInRoleAsync(user, "Admin");
            if(res){
                context.Succeed(requirement);
            }

            var role = await _context.AspNetRoles
                .Where( x => x.Name == "Admin" )
                .FirstOrDefaultAsync();
                
            return;
        }
    }
}