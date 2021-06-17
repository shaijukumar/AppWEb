using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._PageCategory
{
    public class Details
    {
        public class Query : IRequest<PageCategoryDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, PageCategoryDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<PageCategoryDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var pageCategory = await _context.PageCategorys
                    .FindAsync(request.Id);

                if (pageCategory == null)
                    throw new RestException(HttpStatusCode.NotFound, new { PageCategory = "Not found" });

                var toReturn = _mapper.Map <PageCategory, PageCategoryDto>(pageCategory); 

                return toReturn;
            }
    }
}
}
