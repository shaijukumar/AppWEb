using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using Application._AppConfig;
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
    public class DataConfigList 
    {
        public class Query : IRequest<List<AppConfigDto>> {
             public string ConfigType { get; set; }
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
                    .Where(x => x.ConfigTypeId == _context.AppConfigTypes.Where(t => t.Title == request.ConfigType).FirstOrDefault().Id ).ToListAsync();

                var res = _mapper.Map<List<AppConfig>, List<AppConfigDto>>(appConfig);
                foreach(var r in res){
                    r.ConfigType = request.ConfigType;
                }

                return res;
            }
        }
    }
}
