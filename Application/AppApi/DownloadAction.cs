using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;
using Application.Interfaces;
using static Application._AppApi.TakeAction;
using Application.AppEngine;

namespace Application._AppApi
{
    public class DownloadAction
    {
        // public class ActionCommand : IRequest<Dictionary<string, List<object>>>
       public class Command : IRequest<FileContentResult>
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
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ActionId).NotEmpty();				
            }
        }
 
        
        public class Handler : IRequestHandler<Command, FileContentResult>
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
             
            public async Task<FileContentResult> Handle(Command request, CancellationToken cancellationToken)
            {                
                # region get apiDetails and check security

                    ApiDetails apiDetails = new ApiDetails();
                    
                    try{
                        apiDetails =  await  GetApiDetails.Execute(request.ActionId, request.ItemId, _context, _userAccessor.GetCurrentUsername() ); 
                    } 
                    catch(Exception ex){
                        throw new RestException(HttpStatusCode.OK, new { Error = ex.Message });
                    } 

                    if(apiDetails.appAction.ActionType != "FileDownload"){
                         throw new RestException(HttpStatusCode.OK, new { Error = "Invlaid Action type, only  FileDownload allowed" });
                    }

                # endregion get apiDetails and check security

                #region get attachment details from DB
                
                    int attachId = 0;

                    try{
                        attachId = Int32.Parse(request.Parm1);
                    } 
                    catch(Exception ex){
                        throw new RestException(HttpStatusCode.OK, new { Error = "Invalid attachment ID. " + ex.Message });
                    } 
                    

                    var appAttachment = await _context.AppAttachments
                        .FindAsync(attachId);
                    

                    if (appAttachment == null)
                        throw new RestException(HttpStatusCode.NotFound, new { AppAttachment = "Not found" });

                #endregion get attachment details from DB

                #region Read and return file

                    var path = Path.Combine(@"C:\Attachments", appAttachment.Path);

                    byte[] file = null;
                    try{                    
                        if (System.IO.File.Exists(path)) {
                            file = System.IO.File.ReadAllBytes(path);
                        }
                    } 
                    catch(Exception ex){
                        throw new RestException(HttpStatusCode.OK, new { Error = "Invalid file. " + ex.Message });
                    } 

                    return new FileContentResult(file, "application/octet-stream");

                #endregion Read and return file
                                                
                
            }
    }
    }
}
