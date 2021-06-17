using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;
using System.Collections.Generic;

namespace Application._SitePage
{
    public class Create
    {
        public class Command : IRequest<SitePageDto>
        {

            public string Title { get; set; }
            public string CatId { get; set; }
            //public virtual ICollection<PageTagSitePage> PageTag { get; set; }
            public string Tags { get; set; }
            public string URLTitle { get; set; }
            public string PageHtml { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
				RuleFor(x => x.URLTitle).NotEmpty();
				RuleFor(x => x.PageHtml).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, SitePageDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;

            }

            public async Task<SitePageDto> Handle(Command request, CancellationToken cancellationToken)
            {                                                   
                var sitePage = new SitePage
                {
					Title  = request.Title,
                    CatId = request.CatId,
					//PageTag  = request.PageTag,
                    Tags = request.Tags,
					URLTitle  = request.URLTitle,
					PageHtml  = request.PageHtml                  
                };

                _context.SitePages.Add(sitePage);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <SitePage, SitePageDto>(sitePage);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
