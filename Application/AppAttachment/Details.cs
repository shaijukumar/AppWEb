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

namespace Application._AppAttachment
{
    public class Details
    {
        public class Query : IRequest<FileContentResult>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, FileContentResult>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<FileContentResult> Handle(Query request, CancellationToken cancellationToken)
            {
                var appAttachment = await _context.AppAttachments
                    .FindAsync(request.Id);
                

                if (appAttachment == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppAttachment = "Not found" });

                var path = Path.Combine(@"C:\Attachments", appAttachment.FileName);

                byte[] file = null;
                if (System.IO.File.Exists(path)) {
                    file = System.IO.File.ReadAllBytes(path);
                }
                //var file = System.IO.File.ReadAllBytes(path);

                //using var stream = new FileStream(path, FileMode.Open, FileAccess.Read);
                //return File(stream, GetContentType(path), Path.GetFileName(path))

                //FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                //var fileq = fs.Read(); //System.IO.File.ReadAllBytes(path);

                
                return new FileContentResult(file, "application/octet-stream");

                //var toReturn = _mapper.Map <AppAttachment, FileContentResult>(appAttachment); 

                //return toReturn;
            }
    }
}
}
