using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.ToDos
{
    public class Details
    {
        public class Query : IRequest<ToDo>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ToDo>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<ToDo> Handle(Query request, CancellationToken cancellationToken)
            {
                var todo = await _context.Todos.FindAsync(request.Id);                 

                if (todo == null)
                    throw new RestException(HttpStatusCode.NotFound, new { ToDo = "Not Found" });

                return todo;
            }
        }
    }
}