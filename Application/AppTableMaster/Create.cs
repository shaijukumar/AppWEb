using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;
using System.Xml;
using System.Web;
using Application.Errors;
using System.Net;

namespace Application._AppTableMaster
{
    public class Create
    {
        public class Command : IRequest<AppTableMasterDto>
        {

		public string Title { get; set; }
		public string UserAccess { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				RuleFor(x => x.UserAccess).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppTableMasterDto>
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

            public async Task<AppTableMasterDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                var appTableMaster = new AppTableMaster
                {
					Title  = request.Title,
					UserAccess  = request.UserAccess                  
                };

                _context.AppTableMasters.Add(appTableMaster);
                

                try{
                    var success = await _context.SaveChangesAsync() > 0;
                    if (success) 
                    {
                        var tableCouter = new AppTableCouter{
                            TableId = appTableMaster.Id,
                            counter = 0
                        };
                        _context.AppTableCouters.Add(tableCouter);
                        var res = await _context.SaveChangesAsync();

                        return  _mapper.Map <AppTableMaster, AppTableMasterDto>(appTableMaster);
                    }
                    else    
                        throw new RestException(HttpStatusCode.OK, new { Error = $"No dows updated." });
                } 
                catch(Exception ex){
                    throw new RestException(HttpStatusCode.OK, new { Error = $"Problem saving changes. {ex.Message}. {ex.InnerException.Message}." });
                } 
                              
                throw new Exception("Problem saving changes");
            }

            public string UpdateUserAccess(string UserAccess)
            {
                XmlDocument xmlDoc = new XmlDocument();  
                string qry = HttpUtility.UrlDecode(UserAccess);
                try{                   
                    xmlDoc.LoadXml(qry);                                       
                }
                catch(Exception ex){
                    throw new Exception("Invalid qury XML. " + ex.Message );
                }

                XmlNodeList qryNode = xmlDoc.GetElementsByTagName("AccessList");
                

                
                return UserAccess;
            }
        }
    }
}
