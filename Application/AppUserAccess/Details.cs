using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppUserAccess
{
    public class Details
    {
        public class Query : IRequest<AppUserAccessDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppUserAccessDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppUserAccessDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appUserAccess = await _context.AppUserAccesss
                    .FindAsync(request.Id);

                if (appUserAccess == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppUserAccess = "Not found" });

                var toReturn = _mapper.Map <AppUserAccess, AppUserAccessDto>(appUserAccess); 

                return toReturn;
            }
    }
}
}
