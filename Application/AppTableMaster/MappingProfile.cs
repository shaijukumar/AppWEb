using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppTableMaster
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppTableMaster, AppTableMasterDto>();
        }
    }
}
