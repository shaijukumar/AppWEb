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



namespace Application._AppUserAccess
{
    public class Edit
    {
        public class Command : IRequest<AppUserAccessDto>
        {            
            
		public int Id { get; set; }
		public string Title { get; set; }
		public string ActionScript { get; set; }
		public string Description { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				RuleFor(x => x.ActionScript).NotEmpty();
				RuleFor(x => x.Description).NotEmpty();
				
            }

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
            }
        }

        public class Handler : IRequestHandler<Command, AppUserAccessDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<AppUserAccessDto> Handle(Command request, CancellationToken cancellationToken)
            {
                //var test = request.test;

                var appUserAccess = await _context.AppUserAccesss
                    .FindAsync(request.Id);
                if (appUserAccess == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppUserAccess = "Not found" });

				appUserAccess.Title  = request.Title ?? appUserAccess.Title;
				appUserAccess.ActionScript  = request.ActionScript ?? appUserAccess.ActionScript;
				appUserAccess.Description  = request.Description ?? appUserAccess.Description;
				
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<AppUserAccess, AppUserAccessDto>(appUserAccess);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
