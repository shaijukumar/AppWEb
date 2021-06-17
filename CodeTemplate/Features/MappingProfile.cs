using System.Linq;
using AutoMapper;
using Domain;

namespace Application._##Class##
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <##Class##, ##Class##Dto>();
        }
    }
}