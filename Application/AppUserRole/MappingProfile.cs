using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppUserRole
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppUserRole, AppUserRoleDto>();
        }
    }
}
