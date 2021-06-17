using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
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
    public class ActionList
    {
        public class Query : IRequest<List<AppApiActionsDto>>
        {
            public int FlowId { get; set; }
            public int ItemId { get; set; }  
        }

        public class Handler : IRequestHandler<Query, List<AppApiActionsDto>>
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

            public async Task<List<AppApiActionsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<AppAction> retAppActions = new List<AppAction>();
                List<AppAction> appActions = new List<AppAction>();
                AppData appData = new AppData();

                if(request.ItemId == 0){
                    appActions = await _context.AppActions
                        .Where(x => x.FlowId == request.FlowId && x.InitStatus == true  ).ToListAsync();
                }
                else{
                    appData = await _context.AppDatas
                            .Where(x => x.Id ==  request.ItemId ).FirstOrDefaultAsync(); 

                    if( appData == null ){
                        throw new RestException(HttpStatusCode.OK, new { Error = "Invalid ItemId" });
                    }                                     

                    appActions = await _context.AppActions                                                
                        .Where(x => x.FlowId == request.FlowId &&  x.FromStatusList.Any(s => s.Id ==  appData.StatusId )  ).ToListAsync();
                                    
                   
                }

                if( appActions == null ){
                    throw new RestException(HttpStatusCode.OK, new { Error = "Invalid FlowId : " + request.FlowId });
                }

                
                 #region When

                 foreach( AppAction act in  appActions){  

                    if (await ApiAppWhen.Execute(act, _context, _userAccessor.GetCurrentUsername() )){
                        retAppActions.Add(act);
                    }                   
                }            

                 #endregion When

                
                return _mapper.Map<List<AppAction>, List<AppApiActionsDto>>(retAppActions);
            }
        }
    }
}
