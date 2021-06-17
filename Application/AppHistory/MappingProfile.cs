using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppHistory
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppHistory, AppHistoryDto>();
        }
    }
}
