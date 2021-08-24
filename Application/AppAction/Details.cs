using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;
using Application.AppEngine;

namespace Application._AppAction
{
    public class Details
    {
        public class Query : IRequest<AppActionDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppActionDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppActionDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appAction = await _context.AppActions
                    .FindAsync(request.Id);

                if (appAction == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppAction = "Not found" });

                try{
                    appAction.WhenXml = await XmlUpdate.UpdateXml(appAction.WhenXml, _context, appAction.TableId, false );
                    appAction.ActionXml = await XmlUpdate.UpdateXml(appAction.ActionXml, _context, appAction.TableId, false );
                }
                catch{}

                var toReturn = _mapper.Map <AppAction, AppActionDto>(appAction); 

                return toReturn;
            }
    }
}
}
