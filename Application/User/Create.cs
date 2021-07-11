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
    public class Create
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
                RuleFor(x => x.Password).Password();				
            }
        }

        public class Handler : IRequestHandler<Command, UserDTO>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper, UserManager<AppUser> userManager)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<UserDTO> Handle(Command request, CancellationToken cancellationToken)
            { 
                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new {Email = "Email already exists"});

                if (await _context.Users.Where(x => x.UserName == request.Username).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new {Username = "Username already exists"});

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Username,
                    PhoneNumber = request.PhoneNumber,
                    IsActive = request.IsActive, 
                };

                var result = await _userManager.CreateAsync(user, request.Password);
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
