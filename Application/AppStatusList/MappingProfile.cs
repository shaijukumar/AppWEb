using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppStatusList
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppStatusList, AppStatusListDto>();
        }
    }
}
