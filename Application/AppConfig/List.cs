using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application._AppConfig
{
    public class List
    {
        public class Query : IRequest<List<AppConfigDto>> { }

        public class Handler : IRequestHandler<Query, List<AppConfigDto>>
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

            public async Task<List<AppConfigDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appConfig = await _context.AppConfigs
                    .OrderBy(x => x.Type).ThenBy(x => x.Order)              
                    .ToListAsync();
					
                return _mapper.Map<List<AppConfig>, List<AppConfigDto>>(appConfig);
                
            }
        }
    }
}
