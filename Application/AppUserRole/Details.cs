using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppUserRole
{
    public class Details
    {
        public class Query : IRequest<AppUserRoleDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppUserRoleDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppUserRoleDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appUserRole = await _context.AppUserRoles
                    .FindAsync(request.Id);

                if (appUserRole == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppUserRole = "Not found" });

                var toReturn = _mapper.Map <AppUserRole, AppUserRoleDto>(appUserRole); 

                return toReturn;
            }
    }
}
}
