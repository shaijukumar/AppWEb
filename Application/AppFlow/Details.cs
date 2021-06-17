using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppFlow
{
    public class Details
    {
        public class Query : IRequest<AppFlowDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppFlowDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppFlowDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appFlow = await _context.AppFlows
                    .FindAsync(request.Id);

                if (appFlow == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppFlow = "Not found" });

                var toReturn = _mapper.Map <AppFlow, AppFlowDto>(appFlow); 

                return toReturn;
            }
    }
}
}
