using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppNitificationTemplate
{
    public class Details
    {
        public class Query : IRequest<AppNitificationTemplateDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppNitificationTemplateDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppNitificationTemplateDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appNitificationTemplate = await _context.AppNitificationTemplates
                    .FindAsync(request.Id);

                if (appNitificationTemplate == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppNitificationTemplate = "Not found" });

                var toReturn = _mapper.Map <AppNitificationTemplate, AppNitificationTemplateDto>(appNitificationTemplate); 

                return toReturn;
            }
    }
}
}
