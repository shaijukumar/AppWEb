using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Persistence;
using Domain;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Application._AppNavigation
{
    public class Edit
    {
        public class Command : IRequest<AppNavigationDto>
        {                        
            public int Id { get; set; }
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

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
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
                //var test = request.test;

                var appNavigation = await _context.AppNavigations
                    .FindAsync(request.Id);
                if (appNavigation == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppNavigation = "Not found" });

				appNavigation.Title  = request.Title ?? appNavigation.Title;
				appNavigation.Path  = request.Path ?? appNavigation.Path;
				appNavigation.Icon  = request.Icon ?? appNavigation.Icon;				

                var role = await _roleManager.FindByIdAsync(request.RoleId);
                appNavigation.Role = role;
				
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<AppNavigation, AppNavigationDto>(appNavigation);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
