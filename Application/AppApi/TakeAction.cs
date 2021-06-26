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
using System.IO;
using Microsoft.AspNetCore.Mvc;

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
            public ICollection<IFormFile> FileList { get; set; }         
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

        public class ApiDetails
        {
            public AppAction appAction { get; set; }
            public AppData appData { get; set; }
           
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
                # region get apiDetails and check security

                ApiDetails apiDetails = new ApiDetails();
                try{
                    apiDetails =  await  GetApiDetails.Execute(request.ActionId, request.ItemId, _context, _userAccessor.GetCurrentUsername() ); 
                } 
                catch(Exception ex){
                    throw new RestException(HttpStatusCode.OK, new { Error = ex.Message });
                } 

                # endregion get apiDetails and check security

                
                # region init variables   
                             
                var res = new  AppApiDto();
                res.Id = request.ActionId;

                # endregion init variables                                
                                                                
                if( apiDetails.appAction.ActionType == "Query" )
                {          
                    try{
                        res.Result =  await  ApiQuery.ExecuteQuery( apiDetails.appAction, apiDetails.appData, _context, request); 
                    } 
                    catch(Exception ex){
                        throw new RestException(HttpStatusCode.OK, new { Error = ex.Message });
                    }                                        
                }
                else  if( apiDetails.appAction.ActionType == "Action" )
                {
                    try{
                        res.Result = await AppApiActions.ExecuteAction( apiDetails.appAction, apiDetails.appData, _context, request, _userAccessor.GetCurrentUsername()  );
                    } 
                    catch(Exception ex){
                        throw new RestException(HttpStatusCode.OK, new { Error = ex.Message });
                    }  
                                       
                }

                return res.Result;                             

                throw new RestException(HttpStatusCode.OK, new { Error = "Problem saving changes" });
                
            }
        }
    }
} 
