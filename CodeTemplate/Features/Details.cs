using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._##Class##
{
    public class Details
    {
        public class Query : IRequest<##Class##Dto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ##Class##Dto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<##Class##Dto> Handle(Query request, CancellationToken cancellationToken)
            {
                var ##Object## = await _context.##Class##s
                    .FindAsync(request.Id);

                if (##Object## == null)
                    throw new RestException(HttpStatusCode.NotFound, new { ##Class## = "Not found" });

                var toReturn = _mapper.Map <##Class##, ##Class##Dto>(##Object##); 

                return toReturn;
            }
    }
}
}