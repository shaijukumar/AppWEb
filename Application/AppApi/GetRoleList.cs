using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using Application._AppConfig;
using Application._AppNavigation;
using Application._AppStatusList;
using Application._AppUserRoleMaster;
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
    public class GetRoleList 
    {
        public class Query : IRequest<List<AppUserRoleMasterDto>> { }

        public class Handler : IRequestHandler<Query, List<AppUserRoleMasterDto>>
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

            public async Task<List<AppUserRoleMasterDto>> Handle(Query request, CancellationToken cancellationToken)
            {    
                List<IdentityRole> roles = await  _context.AspNetRoles.ToListAsync();

                try{
                    return _mapper.Map<List<IdentityRole>, List<AppUserRoleMasterDto>>(roles);
                }catch(Exception ex){
                      throw new RestException(HttpStatusCode.OK, new { Error = $" {ex.Message}. {ex.InnerException.Message}." });
                }

                throw new RestException(HttpStatusCode.OK, new { Error = $"Problem saving change." });                 

            }
        }
    }
}
