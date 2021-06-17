using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application._AppUserRole
{
    public class List
    {
        public class Query : IRequest<List<AppUserRoleDto>> { }

        public class Handler : IRequestHandler<Query, List<AppUserRoleDto>>
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

            public async Task<List<AppUserRoleDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appUserRole = await _context.AppUserRoles
                    .ToListAsync();
					
                return _mapper.Map<List<AppUserRole>, List<AppUserRoleDto>>(appUserRole);
                
            }
        }
    }
}
