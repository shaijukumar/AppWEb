using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._PageCategory
{
    public class Create
    {
        public class Command : IRequest<PageCategoryDto>
        {

		public string Title { get; set; }
		public Guid Pid { get; set; }
		public string Prop1 { get; set; }
		public string Prop2 { get; set; }
		public string Prop3 { get; set; }
		public string Prop4 { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, PageCategoryDto>
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

            public async Task<PageCategoryDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                var pageCategory = new PageCategory
                {
					Title  = request.Title,
					Pid  = request.Pid,
					Prop1  = request.Prop1,
					Prop2  = request.Prop2,
					Prop3  = request.Prop3,
					Prop4  = request.Prop4                  
                };

                _context.PageCategorys.Add(pageCategory);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <PageCategory, PageCategoryDto>(pageCategory);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
