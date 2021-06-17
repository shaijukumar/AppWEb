using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._AppConfigType
{
    public class Create
    {
        public class Command : IRequest<AppConfigTypeDto>
        {

		public string Title { get; set; }
		public string Description { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppConfigTypeDto>
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

            public async Task<AppConfigTypeDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                var appConfigType = new AppConfigType
                {
					Title  = request.Title,
					Description  = request.Description                  
                };

                _context.AppConfigTypes.Add(appConfigType);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppConfigType, AppConfigTypeDto>(appConfigType);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
