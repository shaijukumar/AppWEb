using System.Linq;
using AutoMapper;
using Domain;

namespace Application._AppAttachment
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap <AppAttachment, AppAttachmentDto>();
        }
    }
}
