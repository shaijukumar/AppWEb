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


namespace Application._AppNotifications
{
    public class Count
    {
        public class Query : IRequest<int> { }

        public class Handler : IRequestHandler<Query, int>
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

            public async Task<int> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.AppNotificationss.CountAsync(x=> x.ReadStatus != true && x.UserId == _userAccessor.GetCurrentUsername() );                
            }
        }
    }
}
