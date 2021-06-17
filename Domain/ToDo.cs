using System;

namespace Domain
{
    public class ToDo
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public virtual AppUser ToDoUser { get; set; }
    }
} 