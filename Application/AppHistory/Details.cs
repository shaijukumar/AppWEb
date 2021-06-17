using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppHistory
{
    public class Details
    {
        public class Query : IRequest<AppHistoryDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppHistoryDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppHistoryDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appHistory = await _context.AppHistorys
                    .FindAsync(request.Id);

                if (appHistory == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppHistory = "Not found" });

                var toReturn = _mapper.Map <AppHistory, AppHistoryDto>(appHistory); 

                return toReturn;
            }
    }
}
}
