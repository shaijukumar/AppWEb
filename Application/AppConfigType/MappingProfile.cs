using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppConfigType
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppConfigType, AppConfigTypeDto>();
        }
    }
}
