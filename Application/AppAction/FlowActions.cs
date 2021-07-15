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


namespace Application._AppAction
{
    public class FlowActions
    {
        public class Query : IRequest<List<AppActionDto>> {
            public int Id { get; set; }  
         }

        public class Handler : IRequestHandler<Query, List<AppActionDto>>
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

            public async Task<List<AppActionDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appAction = await _context.AppActions
                    .Where(x => x.FlowId == request.Id)
                    .ToListAsync();
					
                return _mapper.Map<List<AppAction>, List<AppActionDto>>(appAction);
                
            }
        }
    }
}
