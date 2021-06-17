using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppData
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppData, AppDataDto>();
        }
    }
}
