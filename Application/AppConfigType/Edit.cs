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



namespace Application._AppConfigType
{
    public class Edit
    {
        public class Command : IRequest<AppConfigTypeDto>
        {            
            
		public int Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
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
                //var test = request.test;

                var appConfigType = await _context.AppConfigTypes
                    .FindAsync(request.Id);
                if (appConfigType == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppConfigType = "Not found" });

				appConfigType.Title  = request.Title ?? appConfigType.Title;
				appConfigType.Description  = request.Description ?? appConfigType.Description;
				
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<AppConfigType, AppConfigTypeDto>(appConfigType);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
