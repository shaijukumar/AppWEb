using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppApi
{
    public class Details
    {
        public class Query : IRequest<AppApiDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppApiDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppApiDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var AppApi = await _context.AppApis
                    .FindAsync(request.Id);

                if (AppApi == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppApi = "Not found" });

                var toReturn = _mapper.Map <AppApi, AppApiDto>(AppApi); 

                return toReturn;
            }
    }
}
}
