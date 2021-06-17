using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppConfig
{
    public class Details
    {
        public class Query : IRequest<AppConfigDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppConfigDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppConfigDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appConfig = await _context.AppConfigs
                    .FindAsync(request.Id);

                if (appConfig == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppConfig = "Not found" });

                var toReturn = _mapper.Map <AppConfig, AppConfigDto>(appConfig); 

                return toReturn;
            }
    }
}
}
