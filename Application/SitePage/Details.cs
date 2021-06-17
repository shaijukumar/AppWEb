using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._SitePage
{
    public class Details
    {
        public class Query : IRequest<SitePageDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, SitePageDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<SitePageDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var sitePage = await _context.SitePages
                    .FindAsync(request.Id);

                if (sitePage == null)
                    throw new RestException(HttpStatusCode.NotFound, new { SitePage = "Not found" });

                var toReturn = _mapper.Map <SitePage, SitePageDto>(sitePage); 

                return toReturn;
            }
    }
}
}
