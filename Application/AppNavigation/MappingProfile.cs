using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppNavigation
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppNavigation, AppNavigationDto>();
        }
    }
}
