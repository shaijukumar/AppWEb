using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppNitificationTemplate
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppNitificationTemplate, AppNitificationTemplateDto>();
        }
    }
}
