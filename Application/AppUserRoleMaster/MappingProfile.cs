using System.Linq;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Application._AppUserRoleMaster
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <IdentityRole, AppUserRoleMasterDto>();
            CreateMap <AppUser, GroupUserDTO>();
        }
    }
}
