using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.User;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application._AppUserRoleMaster
{
    public class GroupUserList
    {
        public class Query : IRequest<List<GroupUserDTO>> { 
            public string RoleName { get; set; }
        }
        

        public class Handler : IRequestHandler<Query, List<GroupUserDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            
            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
            {
                _context = context;
                _mapper = mapper;
                _userManager = userManager;
            }

            public async Task<List<GroupUserDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                IList<AppUser> usr = await _userManager.GetUsersInRoleAsync(request.RoleName);    

                return _mapper.Map<IList<AppUser>, List<GroupUserDTO>>(usr);
            }
        }
    }
}