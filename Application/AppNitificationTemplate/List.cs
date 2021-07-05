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


namespace Application._AppNitificationTemplate
{
    public class List
    {
        public class Query : IRequest<List<AppNitificationTemplateDto>> { }

        public class Handler : IRequestHandler<Query, List<AppNitificationTemplateDto>>
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

            public async Task<List<AppNitificationTemplateDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appNitificationTemplate = await _context.AppNitificationTemplates
                    .ToListAsync();
					
                return _mapper.Map<List<AppNitificationTemplate>, List<AppNitificationTemplateDto>>(appNitificationTemplate);
                
            }
        }
    }
}
