using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Application._AppUserRoleMaster
{
    public class Details
    {
        public class Query : IRequest<AppUserRoleMasterDto>
        {
            public string Id { get; set; }
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
                var roles = await  _context.AspNetRoles.FindAsync(request.Id);

                if (roles == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppUserRoleMaster = "Not found" });

                return _mapper.Map <IdentityRole, AppUserRoleMasterDto>(roles);                 

            }
    }
}
}
