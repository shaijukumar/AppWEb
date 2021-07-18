using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Application.Errors;
using System.Net;

namespace Application._AppNavigation
{
    public class Create
    {
        public class Command : IRequest<AppNavigationDto>
        {
            public string Title { get; set; }
            public string Path { get; set; }
            public string Icon { get; set; }            
            public string RoleId {get; set;}
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				RuleFor(x => x.Path).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppNavigationDto>
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

            public async Task<AppNavigationDto> Handle(Command request, CancellationToken cancellationToken)
            {                
                
                var appNavigation = new AppNavigation
                {
					Title  = request.Title,
					Path  = request.Path,
					Icon  = request.Icon,					                 
                };

                var role = await _roleManager.FindByIdAsync(request.RoleId);
                appNavigation.Role = role;


                _context.AppNavigations.Add(appNavigation);
                // var success = await _context.SaveChangesAsync() > 0;

                // if (success)
                // {
                //     var toReturn = _mapper.Map <AppNavigation, AppNavigationDto>(appNavigation);
                //     return toReturn;
                // }   

                 try{                   
                    var success = await _context.SaveChangesAsync() > 0;

                    if (success)
                    {
                        return _mapper.Map <AppNavigation, AppNavigationDto>(appNavigation);;                      
                    } 
                    else{
                       throw new RestException(HttpStatusCode.OK, new { Error = $"No rows updated" });  
                    }
                } 
                catch(Exception ex){
                     throw new RestException(HttpStatusCode.OK, new { Error = $"Problem saving changes. {ex.Message}. {ex.InnerException.Message}." });
                }              

                throw new Exception("Problem saving changes");
}
        }
    }
}
