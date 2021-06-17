using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._##Class##
{
    public class Create
    {
        public class Command : IRequest<##Class##Dto>
        {
##CSFieldListWithoutID##
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                ##CSValidation##
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
                var ##Object## = new ##Class##
                {
					##CSFieldAssign##                  
                };

                _context.##Class##s.Add(##Object##);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <##Class##, ##Class##Dto>(##Object##);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}