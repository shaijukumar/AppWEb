using System;

namespace Application.Todo
{
    public class ToDoDto
    {
         public Guid Id { get; set; }
        public string Title { get; set; }
        
        public string ToDoUserName { get; set; }
        public string ToDoUserId { get; set; }
    }
}