using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using Application._AppNavigation;
using Application._AppStatusList;
using Application.AppEngine;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
 
namespace Application._AppApi
{
    public class DataStatusList 
    {
        public class Query : IRequest<List<AppStatusListDto>> {
             public string TableName { get; set; }
         }

        public class Handler : IRequestHandler<Query, List<AppStatusListDto>>
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

            public async Task<List<AppStatusListDto>> Handle(Query request, CancellationToken cancellationToken)
            {        
                 var appStatusList = await _context.AppStatusLists
                    .Where(x => x.TableId == _context.AppTableMasters.Where(t => t.Title == request.TableName).FirstOrDefault().Id ).ToListAsync();
                    					
                return _mapper.Map<List<AppStatusList>, List<AppStatusListDto>>(appStatusList);
            }
        }
    }
}
