using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppNotificationsMaster
{
    public class Details
    {
        public class Query : IRequest<AppNotificationsMasterDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppNotificationsMasterDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppNotificationsMasterDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appNotificationsMaster = await _context.AppNotificationsMasters
                    .FindAsync(request.Id);

                if (appNotificationsMaster == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppNotificationsMaster = "Not found" });

                var toReturn = _mapper.Map <AppNotificationsMaster, AppNotificationsMasterDto>(appNotificationsMaster); 

                return toReturn;
            }
    }
}
}
