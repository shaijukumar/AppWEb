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
            public string Type { get; set; }   //CurrentUser, * => all, ByUserID, ByDispalyName     
            public string Value { get; set; } //Value of ByUserID, ByDispalyName                                        
            // public string UserId { get; set; }
            // public string DispalyName { get; set; }  
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
                if( string.IsNullOrEmpty(request.Type)){
                    request.Type = "currentuser";
                }

                List<AppUser> users = new List<AppUser>();
                if(request.Type == "*" ){
                    users = await _context.Users.ToListAsync(); 
                }
                else if (request.Type.ToLower() == "currentuser" ){
                    users = await _context.Users
                        .Where( u => u.UserName ==  _userAccessor.GetCurrentUsername()  ).ToListAsync();  
                }
                else if (request.Type.ToLower() == "byuserid" || request.Type.ToLower() == "bydispalyname" ){

                    if( string.IsNullOrEmpty(request.Value)){
                         throw new RestException(HttpStatusCode.OK, new { Error = $"Invalid value parm" });
                    }

                    if (request.Type.ToLower() == "byuserid" ){                     
                        users = await _context.Users
                            .Where( u => u.UserName.ToLower() == request.Value.ToLower()  ).ToListAsync();
                    }
                    else if (request.Type.ToLower() == "bydispalyname" ){                        
                        users = await _context.Users
                            .Where( u => u.DisplayName.ToLower().Contains(request.Value.ToLower())  ).ToListAsync();
                    }
                }
                                                
                // users = await _context.Users
                //     .Where( u => u.UserName.ToLower().Contains(request.Value.ToLower()) || u.DisplayName.ToLower().Contains(request.DispalyName.ToLower()) ).ToListAsync();

                return _mapper.Map<List<AppUser>, List<UserDTO>>(users);
                
            }
        }
    }
}
