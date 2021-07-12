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
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Application._AppConfig
{
    public class Edit
    {
        public class Command : IRequest<AppConfigDto>
        {            
            
		public int Id { get; set; }
		public string Title { get; set; }
        public int Order { get; set; }
		public int Type { get; set; }
		public string Det1 { get; set; }
		public string Det2 { get; set; }
		public string Det3 { get; set; }
		public string Det4 { get; set; }
		public string Det5 { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				RuleFor(x => x.Type).NotEmpty();
				
            }

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
            }
        }

        public class Handler : IRequestHandler<Command, AppConfigDto>
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

            public async Task<AppConfigDto> Handle(Command request, CancellationToken cancellationToken)
            {
                //var test = request.test;

                var appConfig = await _context.AppConfigs
                    .FindAsync(request.Id);
                if (appConfig == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppConfig = "Not found" });

                if( String.IsNullOrEmpty(request.Type.ToString() ) ){
                    request.Type = appConfig.Type;
                }

                if( String.IsNullOrEmpty(request.Order.ToString() ) ){
                    request.Order = appConfig.Order;
                }
                
				appConfig.Title  = request.Title ?? appConfig.Title;
				appConfig.Type  = request.Type; //  ?? appConfig.Type;
                appConfig.Order  = request.Order;                	
				appConfig.Det1  = request.Det1 ?? appConfig.Det1;
				appConfig.Det2  = request.Det2 ?? appConfig.Det2;
				appConfig.Det3  = request.Det3 ?? appConfig.Det3;
				appConfig.Det4  = request.Det4 ?? appConfig.Det4;
				appConfig.Det5  = request.Det5 ?? appConfig.Det5;

                appConfig.ConfigType = await _context.AppConfigTypes
                    .Where(x => x.Id == request.Type ).FirstOrDefaultAsync();
				

                try{
                    var success = await _context.SaveChangesAsync() > 0;          
                    return _mapper.Map<AppConfig, AppConfigDto>(appConfig);        				                                       
                } 
                catch(Exception ex){
                     throw new RestException(HttpStatusCode.OK, new { Error = $"Problem saving changes. {ex.Message}. {ex.InnerException.Message}." });
                }
				
                throw new Exception("Problem saving changes");
            }
        }

    }
}
