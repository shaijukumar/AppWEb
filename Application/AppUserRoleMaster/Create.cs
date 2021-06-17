using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._AppUserRoleMaster
{
    public class Create
    {
        public class Command : IRequest<AppUserRoleMasterDto>
        {

		public string Title { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				
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
                var appUserRoleMaster = new AppUserRoleMaster
                {
					Title  = request.Title                  
                };

                _context.AppUserRoleMasters.Add(appUserRoleMaster);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppUserRoleMaster, AppUserRoleMasterDto>(appUserRoleMaster);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
