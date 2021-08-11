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
            public bool AllActions { get; set; }                        
            public int FlowId { get; set; }
            public int ItemId { get; set; }  
            public string TableName { get; set; }
            public string FlowName { get; set; }
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

                if(request.AllActions){
                    appActions = await _context.AppActions.ToListAsync();
                }
                else if(request.ItemId == 0){

                    # region by FlowName & TableName
                    if(request.FlowId == 0){

                        appActions = await _context.AppActions
                        .Where(
                                x => x.FlowId ==  _context.AppFlows.Where(f => f.Title == request.FlowName ).FirstOrDefault().Id 
                                &&
                                x.TableId == _context.AppTableMasters.Where(t => t.Title == request.TableName).FirstOrDefault().Id
                                && x.InitStatus == true )
                        .ToListAsync();
                    
                        if(appActions == null){
                            throw new RestException(HttpStatusCode.OK, new { Error = "Invalid appFlow : " + request.FlowName });
                        }                    
                    }
                    else{
                        appActions = await _context.AppActions
                        .Where(x => x.FlowId == request.FlowId && x.InitStatus == true  ).ToListAsync();
                    }   
                    #endregion                
                }
                else{

                    # region by action id
                    
                    appData = await _context.AppDatas
                            .Where(x => x.Id ==  request.ItemId ).FirstOrDefaultAsync(); 

                    if( appData == null ){
                        throw new RestException(HttpStatusCode.OK, new { Error = "Invalid ItemId" });
                    }

                    if(request.FlowId == 0){

                        appActions = await _context.AppActions
                        .Where(
                                x => x.FlowId ==  _context.AppFlows.Where(f => f.Title == request.FlowName ).FirstOrDefault().Id 
                                &&
                                x.TableId == _context.AppTableMasters.Where(t => t.Title == request.TableName).FirstOrDefault().Id 
                                &&  x.FromStatusList.Any(s => s.Id ==  appData.StatusId )
                                )
                        .ToListAsync();
                    
                        if(appActions == null){
                            throw new RestException(HttpStatusCode.OK, new { Error = "Invalid appFlow : " + request.FlowName });
                        }
                    }
                    else{
                        appActions = await _context.AppActions                                                
                            .Where(x => x.FlowId == request.FlowId &&  x.FromStatusList.Any(s => s.Id ==  appData.StatusId )  ).ToListAsync();
                    }  

                    # endregion                                                                          
                }

                if( appActions == null ){
                    throw new RestException(HttpStatusCode.OK, new { Error = "Invalid FlowId : " + request.FlowId });
                }
                
                 #region When

                 foreach( AppAction act in  appActions){  

                    if (await ApiAppWhen.Execute(act, _context, _userAccessor.GetCurrentUsername(), _userManager )){
                        retAppActions.Add(act);
                    }                   
                }            

                 #endregion When

                
                return _mapper.Map<List<AppAction>, List<AppApiActionsDto>>(retAppActions);
            }
        }
    }
}
