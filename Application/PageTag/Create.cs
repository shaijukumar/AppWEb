using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._PageTag
{
    public class Create
    {
        public class Command : IRequest<PageTagDto>
        {

		public string label { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.label).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, PageTagDto>
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

            public async Task<PageTagDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                var pageTag = new PageTag
                {
					label  = request.label                  
                };

                _context.PageTags.Add(pageTag);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <PageTag, PageTagDto>(pageTag);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
