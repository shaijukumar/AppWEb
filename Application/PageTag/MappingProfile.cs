using System.Linq;
using AutoMapper;
using Domain;

namespace Application._PageTag
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <PageTag, PageTagDto>()             
             .ForMember(d => d.value, o => o.MapFrom(s => s.Id )); 
        }
    }
}
