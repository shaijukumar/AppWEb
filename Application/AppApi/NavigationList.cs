using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using Application._AppNavigation;
using Application.AppEngine;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
 
namespace Application._AppApi
{
    public class NavigationList 
    {
        public class Query : IRequest<List<AppNavigationDto>> { }

        public class Handler : IRequestHandler<Query, List<AppNavigationDto>>
        {
            private readonly IMapper _mapper;

            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, UserManager<AppUser> userManager )
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<List<AppNavigationDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                
//_userManager.Users.Where(x => x.Role)
                //var currentUser = await _userManager.FindByIdAsync(_userAccessor.GetCurrentUsername());
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
               
                var roles = await _userManager.GetRolesAsync(user);
                //_context.AspNetRoles.Where(r => r.)
                
                

                 var appNavigation = await _context.AppNavigations
                    .ToListAsync();

                return _mapper.Map<List<AppNavigation>, List<AppNavigationDto>>(appNavigation);

                // throw new RestException(HttpStatusCode.OK, new { Error = "Invalid FlowId : " + request.FlowId });

            }
        }
    }
}
