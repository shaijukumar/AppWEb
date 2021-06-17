using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Errors;
using API.Model;
using AutoMapper;
using MediatR;

namespace API.Features._PageTag
{
    public class Details
    {
        public class Query : IRequest<PageTagDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, PageTagDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<PageTagDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var pageTag = await _context.PageTags
                    .FindAsync(request.Id);

                if (pageTag == null)
                    throw new RestException(HttpStatusCode.NotFound, new { PageTag = "Not found" });

                var toReturn = _mapper.Map <PageTag, PageTagDto>(pageTag); 

                return toReturn;
            }
    }
}
}
