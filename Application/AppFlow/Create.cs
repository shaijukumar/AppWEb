using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._AppFlow
{
    public class Create
    {
        public class Command : IRequest<AppFlowDto>
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
                var appFlow = new AppFlow
                {
					Title  = request.Title                  
                };

                _context.AppFlows.Add(appFlow);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppFlow, AppFlowDto>(appFlow);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
