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



namespace Application._PageCategory
{
    public class Edit
    {
        public class Command : IRequest<PageCategoryDto>
        {            
            
		public Guid Id { get; set; }
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

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
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
                //var test = request.test;

                var pageCategory = await _context.PageCategorys
                    .FindAsync(request.Id);
                if (pageCategory == null)
                    throw new RestException(HttpStatusCode.NotFound, new { PageCategory = "Not found" });

				pageCategory.Title  = request.Title ?? pageCategory.Title;
				//pageCategory.Pid  = request.Pid; // ?? pageCategory.Pid;
                pageCategory.Pid  = request.Pid == Guid.Empty ? pageCategory.Pid : request.Pid;
				pageCategory.Prop1  = request.Prop1 ?? pageCategory.Prop1;
				pageCategory.Prop2  = request.Prop2 ?? pageCategory.Prop2;
				pageCategory.Prop3  = request.Prop3 ?? pageCategory.Prop3;
				pageCategory.Prop4  = request.Prop4 ?? pageCategory.Prop4;
				
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<PageCategory, PageCategoryDto>(pageCategory);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
