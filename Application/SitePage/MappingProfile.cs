using System.Linq;
using AutoMapper;
using Domain;

namespace Application._SitePage
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <SitePage, SitePageDto>();
            CreateMap <PageTagSitePage, PageTagSitePageDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.PageTag.Id ));              
        }
    }
}
