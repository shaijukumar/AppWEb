using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppUserRoleMaster
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppUserRoleMaster, AppUserRoleMasterDto>();
        }
    }
}
