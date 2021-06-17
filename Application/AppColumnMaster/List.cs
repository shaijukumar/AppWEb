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


namespace Application._AppColumnMaster
{
    public class List
    {
        public class Query : IRequest<List<AppColumnMasterDto>> { }

        public class Handler : IRequestHandler<Query, List<AppColumnMasterDto>>
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

            public async Task<List<AppColumnMasterDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appColumnMaster = await _context.AppColumnMasters
                    .ToListAsync();
					
                return _mapper.Map<List<AppColumnMaster>, List<AppColumnMasterDto>>(appColumnMaster);
                
            }
        }
    }
}
