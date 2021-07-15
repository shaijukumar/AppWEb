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


namespace Application._AppFlow
{
    public class TableFlows
    {
        public class Query : IRequest<List<AppFlowDto>> {
            public int TableId { get; set; } 
         }

        public class Handler : IRequestHandler<Query, List<AppFlowDto>>
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

            public async Task<List<AppFlowDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appFlow = await _context.AppFlows
                    .Where(x => x.TableId == request.TableId).ToListAsync();
					
                return _mapper.Map<List<AppFlow>, List<AppFlowDto>>(appFlow);
                
            }
        }
    }
}
