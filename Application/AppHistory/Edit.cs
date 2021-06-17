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



namespace Application._AppHistory
{
    public class Edit
    {
        public class Command : IRequest<AppHistoryDto>
        {            
            
		public int Id { get; set; }
		public string Action { get; set; }
		public int FromStage { get; set; }
		public int ToStage { get; set; }
		public int ActionBy { get; set; }
		public DateTime DateTime { get; set; }
		public string Comment { get; set; }
		public string Details1 { get; set; }
		public string Details2 { get; set; }
		public string Details3 { get; set; }
		public string Details4 { get; set; }
		public string Details5 { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Action).NotEmpty();
				
            }

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
            }
        }

        public class Handler : IRequestHandler<Command, AppHistoryDto>
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

            public async Task<AppHistoryDto> Handle(Command request, CancellationToken cancellationToken)
            {
                //var test = request.test;

                var appHistory = await _context.AppHistorys
                    .FindAsync(request.Id);
                if (appHistory == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppHistory = "Not found" });

				appHistory.Action  = request.Action ?? appHistory.Action;
				appHistory.FromStage  = request.FromStage;
				appHistory.ToStage  = request.ToStage;
				appHistory.ActionBy  = request.ActionBy;
				appHistory.DateTime  = DateTime.Now;
				appHistory.Comment  = request.Comment ?? appHistory.Comment;
				appHistory.Details1  = request.Details1 ?? appHistory.Details1;
				appHistory.Details2  = request.Details2 ?? appHistory.Details2;
				appHistory.Details3  = request.Details3 ?? appHistory.Details3;
				appHistory.Details4  = request.Details4 ?? appHistory.Details4;
				appHistory.Details5  = request.Details5 ?? appHistory.Details5;
				
				
				// _context.Entry(cl).State = EntityState.Modified;  //.Entry(user).State = EntityState.Added; /
				var success = await _context.SaveChangesAsync() > 0;                   
				//if (success) return Unit.Value;
				if (success)
				{
					var toReturn = _mapper.Map<AppHistory, AppHistoryDto>(appHistory);
					return toReturn;
				}


                throw new Exception("Problem saving changes");
            }
        }

    }
}
