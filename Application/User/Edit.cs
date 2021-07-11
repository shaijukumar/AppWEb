
using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;
using Application.Validators;
using Application.Errors;
using System.Net;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class Edit
    {
        public class Command : IRequest<UserDTO>
        {
		    public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string PhoneNumber { get; set; }
            public bool IsActive { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                //RuleFor(x => x.Password).Password();				
            }
        }

        public class Handler : IRequestHandler<Command, UserDTO>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
                _signInManager = signInManager;
            }

            public async Task<UserDTO> Handle(Command request, CancellationToken cancellationToken)
            { 
                 var user = await _context.Users.FirstOrDefaultAsync( u => u.UserName == request.Username  );  

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not Found" });

                user.DisplayName  = request.DisplayName ?? user.DisplayName;
                user.Email  = request.Email ?? user.Email;
                user.PhoneNumber  = request.PhoneNumber ?? user.PhoneNumber;
                user.IsActive  = request.IsActive;

                if(!user.IsActive){
                    user.LockoutEnabled = true;
                    user.LockoutEnd = DateTime.Now.AddYears(1000);
                }
                else{
                     user.LockoutEnabled = false;
                }

                if (!string.IsNullOrEmpty(request.Password))
                {
                    user.PasswordHash = _userManager.PasswordHasher.HashPassword (user, request.Password);
                }
                                              
                var result = await _userManager.UpdateAsync(user);
                string errMsg = string.Empty;
            
                if (result.Succeeded)
                {
                    var toReturn = _mapper.Map <AppUser, UserDTO>(user);
                    return toReturn;
                }
                else{
                   
                   foreach(var err in result.Errors){
                       errMsg += err.Code + " - " + err.Description;
                   }
                }

                throw new RestException(HttpStatusCode.OK, new { Error = $"Problem saving changes. {errMsg}" });
               
            }
        }
    }
}

