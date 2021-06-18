using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Persistence;
using Domain;



namespace Application._AppAttachment
{
    public class Edit
    {
        public class Command : IRequest<AppAttachmentDto>
        {            
            
            public int Id { get; set; }
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

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
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
                //var test = request.test;

                var appAttachment = await _context.AppAttachments
                    .FindAsync(request.Id);
                if (appAttachment == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppAttachment = "Not found" });

				appAttachment.AppDataId  = request.AppDataId; // ?? appAttachment.AppDataId;
				appAttachment.FileName  = request.FileName ?? appAttachment.FileName;
				appAttachment.Path  = request.Path ?? appAttachment.Path;
				appAttachment.Prop1  = request.Prop1 ?? appAttachment.Prop1;
				appAttachment.Prop2  = request.Prop2 ?? appAttachment.Prop2;
				appAttachment.Prop3  = request.Prop3 ?? appAttachment.Prop3;
				appAttachment.Prop4  = request.Prop4 ?? appAttachment.Prop4;
				appAttachment.Prop5  = request.Prop5 ?? appAttachment.Prop5;
				
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<AppAttachment, AppAttachmentDto>(appAttachment);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
