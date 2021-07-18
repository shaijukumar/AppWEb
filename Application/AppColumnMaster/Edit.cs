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



namespace Application._AppColumnMaster
{
    public class Edit
    {
        public class Command : IRequest<AppColumnMasterDto>
        {            
            public int Order { get; set; }
            public int Id { get; set; }
            public int TableID { get; set; }
            public string Title { get; set; }
            public string Type { get; set; }
            public string UserAccess { get; set; }
            public int ConfigId { get; set; }	
		    public int AttachmentConfig { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.TableID).NotEmpty();
				RuleFor(x => x.Title).NotEmpty();
				RuleFor(x => x.Type).NotEmpty();
				RuleFor(x => x.UserAccess).NotEmpty();
				
            }

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
            }
        }

        public class Handler : IRequestHandler<Command, AppColumnMasterDto>
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

            public async Task<AppColumnMasterDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var appColumnMaster = await _context.AppColumnMasters
                    .FindAsync(request.Id);
                if (appColumnMaster == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppColumnMaster = "Not found" });

                if( request.Type != appColumnMaster.Type)
                {
                    appColumnMaster.AppDataFiled = await Create.GetNewColText( _context, request.Type, request.TableID);
                }

				appColumnMaster.Order  = request.Order;
                appColumnMaster.TableID  = request.TableID; // ?? appColumnMaster.TableID;
				appColumnMaster.Title  = request.Title ?? appColumnMaster.Title;
				appColumnMaster.Type  = request.Type ?? appColumnMaster.Type;
				appColumnMaster.UserAccess  = request.UserAccess ?? appColumnMaster.UserAccess; 

                appColumnMaster.ConfigId  = request.ConfigId; 
                appColumnMaster.AttachmentConfig  = request.AttachmentConfig; 
				
				// var success = await _context.SaveChangesAsync() > 0;                   
				// //if (success) return Unit.Value;
				// if (success)
				// {
				// 	var toReturn = _mapper.Map<AppColumnMaster, AppColumnMasterDto>(appColumnMaster);
				// 	return toReturn;
				// }

                try{
                    var success = await _context.SaveChangesAsync() > 0;
                    if (success) 
                        return  _mapper.Map <AppColumnMaster, AppColumnMasterDto>(appColumnMaster);
                    else    
                        throw new RestException(HttpStatusCode.OK, new { Error = $"No dows updated." });
                } 
                catch(Exception ex){
                    throw new RestException(HttpStatusCode.OK, new { Error = $"Problem saving changes. {ex.Message}. {ex.InnerException.Message}." });
                } 

                throw new Exception("Problem saving changes");
            }
        }

    }
}
