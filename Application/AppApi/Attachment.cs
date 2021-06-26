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

namespace Application._AppApi
{
    public class Attachment
    {
        public class Command : IRequest<AppApiDto>
        {
		    public string Title { get; set; }     
            public IFormFile File { get; set; }       
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppApiDto>
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

            public async Task<AppApiDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                // var AppApi = new AppApi
                // {
				// 	Title  = request.Title                  
                // };

                // _context.AppApis.Add(AppApi);
                // var success = await _context.SaveChangesAsync() > 0;

                // if (success)
                // {
                //     var toReturn = _mapper.Map <AppApi, AppApiDto>(AppApi);
                //     return toReturn;
                // }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
