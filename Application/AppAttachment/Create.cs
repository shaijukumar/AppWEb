using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using static Application._AppApi.TakeAction;
using Newtonsoft.Json.Linq;

namespace Application._AppAttachment
{
    public class Create
    {
        public class Command : IRequest<AppAttachmentDto>
        {
            public ICollection<IFormFile> FileList { get; set; }
            public ICollection<ApiAttachment> Files { get; set; }  
            
            public int AppDataId { get; set; }
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
                RuleFor(x => x.AppDataId).NotEmpty();
				RuleFor(x => x.FileName).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppAttachmentDto>
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

            public async Task<AppAttachmentDto> Handle(Command request, CancellationToken cancellationToken)
            {         
                var appAttachment = new AppAttachment();

                if( !string.IsNullOrEmpty(request.Prop1)){

                    JObject jObject = JObject.Parse(request.Prop1);
                    foreach(object obj in jObject){
                        string key = ((System.Collections.Generic.KeyValuePair<string, Newtonsoft.Json.Linq.JToken>)obj).Key.ToString();
                        string value = ((System.Collections.Generic.KeyValuePair<string, Newtonsoft.Json.Linq.JToken>)obj).Value.ToString();
                    }
                }
                

                foreach(var file in request.FileList){
                    var path = Path.Combine(@"C:\Attachments", file.FileName);



                    // var stream = new FileStream(path, FileMode.Create);
                    // await file.CopyToAsync(stream);

                    using (var fileStream = new FileStream(path,FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);                     
                    }

                    // using (var fileStream = new FileStream(path,FileMode.Create))
                    // {
                    //     await fileStream.CopyToAsync(fileStream);                     
                    // }
                    
                    
                    //result.Add(new FileUploadResult() { Name = file.FileName, Length = file.Length });

                    appAttachment = new AppAttachment
                    {
                        AppDataId  = request.AppDataId,
                        FileName  = file.FileName,
                        Path  = request.Path,
                        Prop1  = request.Prop1,
                        Prop2  = request.Prop2,
                        Prop3  = request.Prop3,
                        Prop4  = request.Prop4,
                        Prop5  = request.Prop5                  
                    };

                    _context.AppAttachments.Add(appAttachment);

                } 

                
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppAttachment, AppAttachmentDto>(appAttachment);
                    return toReturn;
                }
                throw new Exception("Problem saving changes");
}
        }
    }
}
