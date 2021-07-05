using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;


namespace Application._AppNitificationTemplate
{
    public class Create
    {
        public class Command : IRequest<AppNitificationTemplateDto>
        {

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
                var appNitificationTemplate = new AppNitificationTemplate
                {
					Title  = request.Title,
					Template  = request.Template,
					Description  = request.Description                  
                };

                _context.AppNitificationTemplates.Add(appNitificationTemplate);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppNitificationTemplate, AppNitificationTemplateDto>(appNitificationTemplate);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
