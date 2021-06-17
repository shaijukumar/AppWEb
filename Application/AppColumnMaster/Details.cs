using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppColumnMaster
{
    public class Details
    {
        public class Query : IRequest<AppColumnMasterDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppColumnMasterDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppColumnMasterDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appColumnMaster = await _context.AppColumnMasters
                    .FindAsync(request.Id);

                if (appColumnMaster == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppColumnMaster = "Not found" });

                var toReturn = _mapper.Map <AppColumnMaster, AppColumnMasterDto>(appColumnMaster); 

                return toReturn;
            }
    }
}
}
