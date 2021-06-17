using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Application._AppUserRole
{
    public class RoleList
    {
        public class Query : IRequest<List<AppUserRoleDto>>
        {
            public int role { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<AppUserRoleDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<AppUserRoleDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appUserRole = await _context.AppUserRoles
                    .Where(x => x.AppUserRoleMasterId == request.role).ToListAsync();
                    //.FindAsync(request.role);

                if (appUserRole == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppUserRole = "Not found" });
                
                return _mapper.Map<List<AppUserRole>, List<AppUserRoleDto>>(appUserRole);
               
            }
    }
}
}
