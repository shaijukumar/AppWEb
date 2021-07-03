using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppNotifications
{
    public class Details
    {
        public class Query : IRequest<AppNotificationsDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppNotificationsDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppNotificationsDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appNotifications = await _context.AppNotificationss
                    .FindAsync(request.Id);

                if (appNotifications == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppNotifications = "Not found" });

                var toReturn = _mapper.Map <AppNotifications, AppNotificationsDto>(appNotifications); 

                return toReturn;
            }
    }
}
}
