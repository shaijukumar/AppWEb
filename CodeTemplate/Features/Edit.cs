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



namespace Application._##Class##
{
    public class Edit
    {
        public class Command : IRequest<##Class##Dto>
        {            
            ##CSFieldList##
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                ##CSValidation##
            }

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
            }
        }

        public class Handler : IRequestHandler<Command, ##Class##Dto>
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

            public async Task<##Class##Dto> Handle(Command request, CancellationToken cancellationToken)
            {
                //var test = request.test;

                var ##Object## = await _context.##Class##s
                    .FindAsync(request.Id);
                if (##Object## == null)
                    throw new RestException(HttpStatusCode.NotFound, new { ##Class## = "Not found" });

				##CSEditFieldAssign##
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<##Class##, ##Class##Dto>(##Object##);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}