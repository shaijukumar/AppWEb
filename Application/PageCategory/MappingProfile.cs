using System.Linq;
using AutoMapper;
using Domain;

namespace Application._PageCategory
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <PageCategory, PageCategoryDto>();
        }
    }
}
