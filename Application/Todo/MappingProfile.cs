using AutoMapper;
using Domain;

namespace Application.Todo
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            
            CreateMap<ToDo, ToDoDto>()
               .ForMember(d => d.ToDoUserName, o => o.MapFrom(s => s.ToDoUser.UserName))
            .ForMember(d => d.ToDoUserId, o => o.MapFrom(s => s.ToDoUser.Id));
        }
    }
}