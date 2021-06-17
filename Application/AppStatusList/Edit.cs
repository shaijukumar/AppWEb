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



namespace Application._AppStatusList
{
    public class Edit
    {
        public class Command : IRequest<AppStatusListDto>
        {            
            
            public int Id { get; set; }
            public string Title { get; set; }
            public int Order { get; set; }	
            public int TableId { get; set; } 
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				
            }

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
            }
        }

        public class Handler : IRequestHandler<Command, AppStatusListDto>
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

            public async Task<AppStatusListDto> Handle(Command request, CancellationToken cancellationToken)
            {
                //var test = request.test;

                var appStatusList = await _context.AppStatusLists
                    .FindAsync(request.Id);
                if (appStatusList == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppStatusList = "Not found" });

				appStatusList.Title  = request.Title ?? appStatusList.Title;
				appStatusList.Order  = request.Order ;
                appStatusList.TableId  = request.TableId ;

				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<AppStatusList, AppStatusListDto>(appStatusList);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
