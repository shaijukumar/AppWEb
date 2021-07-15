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



namespace Application._AppTableMaster
{
    public class Edit
    {
        public class Command : IRequest<AppTableMasterDto>
        {            
            
		public int Id { get; set; }
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

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
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
                //var test = request.test;

                var appTableMaster = await _context.AppTableMasters
                    .FindAsync(request.Id);
                if (appTableMaster == null)
                    throw new RestException(HttpStatusCode.OK, new { Error = "Data not found" });

				appTableMaster.Title  = request.Title ?? appTableMaster.Title;
				appTableMaster.UserAccess  = request.UserAccess ?? appTableMaster.UserAccess;
				
                try{
                    var success = await _context.SaveChangesAsync() > 0;
                    if (success) 
                        return  _mapper.Map<AppTableMaster, AppTableMasterDto>(appTableMaster);
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
