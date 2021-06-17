using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Todo;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ToDos
{
    public class Create
    {
        public class Command : IRequest<ToDoDto>
        {          
            public string Title { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();            
            }
        }

        public class Handler : IRequestHandler<Command, ToDoDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
                
            }

            public async Task<ToDoDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetCurrentUsername());
                                    
                var todo = new ToDo
                {
                    Id = Guid.NewGuid(), //request.Id,
                    Title = request.Title,
                    ToDoUser = user
                };

                _context.Todos.Add(todo);
                var success = await _context.SaveChangesAsync() > 0;

                if (success){
                    return _mapper.Map <ToDo, ToDoDto>(todo);                               
                } 

                throw new Exception("Problem saving changes");
            }
        }
    }
}