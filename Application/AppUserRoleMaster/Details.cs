using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppUserRoleMaster
{
    public class Details
    {
        public class Query : IRequest<AppUserRoleMasterDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppUserRoleMasterDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppUserRoleMasterDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appUserRoleMaster = await _context.AppUserRoleMasters
                    .FindAsync(request.Id);

                if (appUserRoleMaster == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppUserRoleMaster = "Not found" });

                var toReturn = _mapper.Map <AppUserRoleMaster, AppUserRoleMasterDto>(appUserRoleMaster); 

                return toReturn;
            }
    }
}
}
