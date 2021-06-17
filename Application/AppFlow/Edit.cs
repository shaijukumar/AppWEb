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



namespace Application._AppFlow
{
    public class Edit
    {
        public class Command : IRequest<AppFlowDto>
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

        public class Handler : IRequestHandler<Command, AppFlowDto>
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

            public async Task<AppFlowDto> Handle(Command request, CancellationToken cancellationToken)
            {
                //var test = request.test;

                var appFlow = await _context.AppFlows
                    .FindAsync(request.Id);
                if (appFlow == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppFlow = "Not found" });

				appFlow.Title  = request.Title ?? appFlow.Title;
				
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<AppFlow, AppFlowDto>(appFlow);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
