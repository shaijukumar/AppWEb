using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppNavigation
{
    public class Details
    {
        public class Query : IRequest<AppNavigationDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppNavigationDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppNavigationDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appNavigation = await _context.AppNavigations
                    .FindAsync(request.Id);

                if (appNavigation == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppNavigation = "Not found" });

                var toReturn = _mapper.Map <AppNavigation, AppNavigationDto>(appNavigation); 

                return toReturn;
            }
    }
}
}
