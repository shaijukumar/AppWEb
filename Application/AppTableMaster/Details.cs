using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application._AppTableMaster
{
    public class Details
    {
        public class Query : IRequest<AppTableMasterDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppTableMasterDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppTableMasterDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appTableMaster = await _context.AppTableMasters
                    .FindAsync(request.Id);

                if (appTableMaster == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppTableMaster = "Not found" });

                var toReturn = _mapper.Map <AppTableMaster, AppTableMasterDto>(appTableMaster); 

                return toReturn;
            }
    }
}
}
