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



namespace Application._AppNitificationTemplate
{
    public class Edit
    {
        public class Command : IRequest<AppNitificationTemplateDto>
        {            
            
		public int Id { get; set; }
		public string Title { get; set; }
		public string Template { get; set; }
		public string Description { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
			    RuleFor(x => x.Template).NotEmpty();
				
            }

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
            }
        }

        public class Handler : IRequestHandler<Command, AppNitificationTemplateDto>
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

            public async Task<AppNitificationTemplateDto> Handle(Command request, CancellationToken cancellationToken)
            {
                //var test = request.test;

                var appNitificationTemplate = await _context.AppNitificationTemplates
                    .FindAsync(request.Id);
                if (appNitificationTemplate == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppNitificationTemplate = "Not found" });

				appNitificationTemplate.Title  = request.Title ?? appNitificationTemplate.Title;
				appNitificationTemplate.Template  = request.Template ?? appNitificationTemplate.Template;
				appNitificationTemplate.Description  = request.Description ?? appNitificationTemplate.Description;
				
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<AppNitificationTemplate, AppNitificationTemplateDto>(appNitificationTemplate);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
