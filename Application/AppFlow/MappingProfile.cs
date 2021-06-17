using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppFlow
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppFlow, AppFlowDto>();
        }
    }
}
