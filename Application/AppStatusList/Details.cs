using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppStatusList
{
    public class Details
    {
        public class Query : IRequest<AppStatusListDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppStatusListDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppStatusListDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appStatusList = await _context.AppStatusLists
                    .FindAsync(request.Id);

                if (appStatusList == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppStatusList = "Not found" });

                var toReturn = _mapper.Map <AppStatusList, AppStatusListDto>(appStatusList); 

                return toReturn;
            }
    }
}
}
