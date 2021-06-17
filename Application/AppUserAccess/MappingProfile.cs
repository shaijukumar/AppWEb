using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppUserAccess
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppUserAccess, AppUserAccessDto>();
        }
    }
}
