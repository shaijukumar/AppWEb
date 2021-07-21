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
using AppWebCustom;
using Microsoft.AspNetCore.Identity;

namespace Application._AppApi
{ 
    public class TakeAction
    {        
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

        public class CommandValidator : AbstractValidator<ActionCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ActionId).NotEmpty();				
            }
        }

        public class Handler : IRequestHandler<ActionCommand, Dictionary<string, List<object>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper, UserManager<AppUser> userManager)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<Dictionary<string, List<object>>> Handle(ActionCommand request, CancellationToken cancellationToken)
            {
                   
                // AppUser user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());                
                // var rolesNames = await _userManager.GetRolesAsync(user);
                // var roles1 = await  _context.AspNetRoles.Where( x => rolesNames.Contains(x.Name) ).ToListAsync();

        
                # region get apiDetails and check security

                ApiDetails apiDetails = new ApiDetails(request.ActionId, request.ItemId, _context, _userAccessor.GetCurrentUsername() ); //request

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
                        res.Result =  await  ApiQuery.ExecuteQuery( apiDetails.appAction, apiDetails.appData, _context, request, _userManager, _userAccessor); 
                    } 
                    catch(Exception ex){
                        throw new RestException(HttpStatusCode.OK, new { Error = ex.Message });
                    }                                        
                }
                else  if( apiDetails.appAction.ActionType == "Action" )
                {
                    try{
                        res.Result = await AppApiActions.ExecuteAction(apiDetails, _context, request, _userAccessor.GetCurrentUsername()  );
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
