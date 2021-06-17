using System.Linq;
using API.Model;
using AutoMapper;

namespace API.Features._PageTag
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <PageTag, PageTagDto>();
        }
    }
}
