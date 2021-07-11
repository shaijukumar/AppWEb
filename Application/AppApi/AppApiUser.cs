using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using Application.AppEngine;
using Application.Errors;
using Application.Interfaces;
using Application.User;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
 
namespace Application._AppApi
{
    public class AppApiUser
    {
        public class Query : IRequest<List<UserDTO>>
        {
            public string UserId { get; set; }
            public string DispalyName { get; set; }  
        }

        public class Handler : IRequestHandler<Query, List<UserDTO>>
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

            public async Task<List<UserDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users.ToListAsync(); 

                users = await _context.Users
                    .Where( u => u.UserName.ToLower().Contains(request.UserId.ToLower()) || u.DisplayName.ToLower().Contains(request.DispalyName.ToLower()) ).ToListAsync();

                return _mapper.Map<List<AppUser>, List<UserDTO>>(users);
                
            }
        }
    }
}
