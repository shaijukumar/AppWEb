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
using Microsoft.AspNetCore.Identity;

namespace Application._AppUserRoleMaster
{
    public class Edit
    {
        public class Command : IRequest<AppUserRoleMasterDto>
        {            
            
		public string Id { get; set; }
		public string Name { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Name).NotEmpty();
				
            }

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
            }
        }

        public class Handler : IRequestHandler<Command, AppUserRoleMasterDto>
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

            public async Task<AppUserRoleMasterDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var role = await _roleManager.FindByIdAsync(request.Id);
                if(role == null){
                    throw new RestException(HttpStatusCode.OK, new { Error = $"Ront not found." });
                }
                role.Name = request.Name;
                


                try{
                    await _roleManager.UpdateAsync(role);
                    return _mapper.Map <IdentityRole, AppUserRoleMasterDto>(role);                  
                } 
                catch(Exception ex){
                     throw new RestException(HttpStatusCode.OK, new { Error = $"Problem saving changes. {ex.Message}. {ex.InnerException.Message}." });
                } 


                // var appUserRoleMaster = await _context.AppUserRoleMasters
                //     .FindAsync(request.Id);
                // if (appUserRoleMaster == null)
                //     throw new RestException(HttpStatusCode.NotFound, new { AppUserRoleMaster = "Not found" });

				// appUserRoleMaster.Title  = request.Name ?? appUserRoleMaster.Title;
				
								
				

                // try{
                //    var success = await _context.SaveChangesAsync() > 0;                   				
                //     if (success)
                //     {
                //         var toReturn = _mapper.Map<AppUserRoleMaster, AppUserRoleMasterDto>(appUserRoleMaster);
                //         return toReturn;
                //     }
                // } 
                // catch(Exception ex){
                //      throw new RestException(HttpStatusCode.OK, new { Error = $"Problem saving changes. {ex.Message}. {ex.InnerException.Message}." });
                // } 

                throw new Exception("Problem saving changes");
            }
        }

    }
}
