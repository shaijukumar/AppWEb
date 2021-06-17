using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppConfigType
{
    public class Details
    {
        public class Query : IRequest<AppConfigTypeDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppConfigTypeDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppConfigTypeDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appConfigType = await _context.AppConfigTypes
                    .FindAsync(request.Id);

                if (appConfigType == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppConfigType = "Not found" });

                var toReturn = _mapper.Map <AppConfigType, AppConfigTypeDto>(appConfigType); 

                return toReturn;
            }
    }
}
}
