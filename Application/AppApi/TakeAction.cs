using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using System.Net;
using Newtonsoft.Json.Linq;
using System.Xml;
using System.Reflection;
using Newtonsoft.Json;
using Application.AppEngine;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Application._AppApi
{ 
    public class TakeAction
    {
        public class Command : IRequest<Dictionary<string, List<object>>>
        {
		    public int ActionId { get; set; }
            public int ItemId { get; set; }  
            public string RequestType { get; set; }                          
            public string ReturnFlow { get; set; }                    
            public string Parm1 { get; set; }
            public string Parm2 { get; set; }
            public string Parm3 { get; set; }
            public string Parm4 { get; set; }
            public string Parm5 { get; set; }
            public string Parm6 { get; set; }            
            public string Parm7 { get; set; }
            public string Parm8 { get; set; }
            public string Parm9 { get; set; }
            public string Parm10 { get; set; }        
            public ICollection<ApiAttachment> FileList { get; set; }         
        }

        public class ApiAttachment
        {
            public IFormFile File { get; set; }
            public string FileName { get; set; }
            public string Path { get; set; }
            public string Prop1 { get; set; }
            public string Prop2 { get; set; }
            public string Prop3 { get; set; }
            public string Prop4 { get; set; }
            public string Prop5 { get; set; } 
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ActionId).NotEmpty();				
            }
        }

        public class Handler : IRequestHandler<Command, Dictionary<string, List<object>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;

            }

            public async Task<Dictionary<string, List<object>>> Handle(Command request, CancellationToken cancellationToken)
            {
                
                # region Get action details from db

                var appAction = await _context.AppActions
                    .Where(x => x.Id == request.ActionId  ).FirstOrDefaultAsync();

                if (appAction == null )
                    throw new RestException(HttpStatusCode.NotFound, new { Error = "invalid Action" });

                # endregion Get action details from db

                # region init variables
                
                AppData appData = new AppData();
                var res = new  AppApiDto();
                res.Id = request.ActionId;

                # endregion init variables

                # region check FromStatus 

                if( appAction.ActionType == "Action" )
                {
                    if(request.ItemId != 0){
                        appData = await _context.AppDatas
                            .Where(x => x.Id ==  request.ItemId ).FirstOrDefaultAsync(); 

                        if( appData == null ){
                            throw new RestException(HttpStatusCode.OK, new { Error = "Invalid ItemId" });
                        }    

                        // if( appAction.FromStatusId !=0 && appData.StatusId != appAction.FromStatusId ){
                        //     throw new RestException(HttpStatusCode.OK, new { Error = "Invalid from status" });

                        if( appAction.FromStatusList.Count == 0 && !appAction.FromStatusList.Any( s => s.Id ==  appData.StatusId)  ){
                            throw new RestException(HttpStatusCode.OK, new { Error = "Invalid from status" });
                     }                    
                    }
                    else if(!appAction.InitStatus){
                        throw new RestException(HttpStatusCode.OK, new { Error = "Invalid from status" });
                    }
                }                

                # endregion check FromStatus

               //Execute
               if (!await ApiAppWhen.Execute(appAction, _context, _userAccessor.GetCurrentUsername() )){
                   throw new RestException(HttpStatusCode.OK, new { Error = "Unauthorized" });
               }
                                                 
                if( appAction.ActionType == "Query" )
                {
                  res.Result =  await  ApiQuery.ExecuteQuery( appAction, appData, _context, request);                   
                }
                else  if( appAction.ActionType == "Action" )
                {
                   res.Result = await AppApiActions.ExecuteAction( appAction, appData, _context, request, _userAccessor.GetCurrentUsername()  );                    
                }

                return res.Result;                             

                throw new RestException(HttpStatusCode.OK, new { Error = "Problem saving changes" });
                
            }
        }
    }
}
