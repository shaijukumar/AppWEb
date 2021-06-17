using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application._AppConfigType
{
    public class List
    {
        public class Query : IRequest<List<AppConfigTypeDto>> { }

        public class Handler : IRequestHandler<Query, List<AppConfigTypeDto>>
        {
            private readonly IMapper _mapper;

            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, UserManager<AppUser> userManager )
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<List<AppConfigTypeDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appConfigType = await _context.AppConfigTypes
                    .ToListAsync();
					
                return _mapper.Map<List<AppConfigType>, List<AppConfigTypeDto>>(appConfigType);
                
            }
        }
    }
}
