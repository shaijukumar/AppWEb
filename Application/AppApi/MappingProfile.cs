using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppApi
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppAction, AppApiActionsDto>();
        }
    }
}
