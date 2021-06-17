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
    public class ConfigList
    {     
        public class Query : IRequest<List<AppConfigDto>>
        {
            public int Id { get; set; }
        }

        

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
                    .Where(x => x.Type == request.Id).ToListAsync();

                return _mapper.Map<List<AppConfig>, List<AppConfigDto>>(appConfig);
                
            }
        }
    }
}
