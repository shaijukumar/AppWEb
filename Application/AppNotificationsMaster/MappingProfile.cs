using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppNotificationsMaster
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppNotificationsMaster, AppNotificationsMasterDto>();
        }
    }
}
