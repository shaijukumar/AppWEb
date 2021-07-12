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



namespace Application._AppUserRoleMaster
{
    public class Edit
    {
        public class Command : IRequest<AppUserRoleMasterDto>
        {            
            
		public int Id { get; set; }
		public string Title { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				
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
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<AppUserRoleMasterDto> Handle(Command request, CancellationToken cancellationToken)
            {
                //var test = request.test;

                var appUserRoleMaster = await _context.AppUserRoleMasters
                    .FindAsync(request.Id);
                if (appUserRoleMaster == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppUserRoleMaster = "Not found" });

				appUserRoleMaster.Title  = request.Title ?? appUserRoleMaster.Title;
				
								
				

                try{
                   var success = await _context.SaveChangesAsync() > 0;                   				
                    if (success)
                    {
                        var toReturn = _mapper.Map<AppUserRoleMaster, AppUserRoleMasterDto>(appUserRoleMaster);
                        return toReturn;
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
