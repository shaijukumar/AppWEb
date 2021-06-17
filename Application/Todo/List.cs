using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Todo;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ToDos
{
    public class List
    {
        public class Query : IRequest<List<ToDoDto>> { }

        public class Handler : IRequestHandler<Query, List<ToDoDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<ToDoDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var todos = await _context.Todos
                  //  .Include( x => x.ToDoUser)
                    .ToListAsync();

               return _mapper.Map<List<ToDo>, List<ToDoDto>>(todos);
            }
        }
    }
}