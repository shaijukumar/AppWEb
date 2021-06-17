using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Persistence;
using Domain;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Application._SitePage
{
    public class Edit
    {
        public class Command : IRequest<SitePageDto>
        {            
            
		public Guid Id { get; set; }
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

            private object RRuleFor(Func<object, object> p)
            {
                throw new NotImplementedException();
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
                //var test = request.test;

                var sitePage = await _context.SitePages
                    .FindAsync(request.Id);
                if (sitePage == null)
                    throw new RestException(HttpStatusCode.NotFound, new { SitePage = "Not found" });

				sitePage.Title  = request.Title ?? sitePage.Title;
				//sitePage.PageTag  = request.PageTag ?? sitePage.PageTag;
                 sitePage.CatId = request.CatId;
                sitePage.Tags = request.Tags ?? sitePage.Tags;
				sitePage.URLTitle  = request.URLTitle ?? sitePage.URLTitle;
				sitePage.PageHtml  = request.PageHtml ?? sitePage.PageHtml;
				
				try{
                    var success = await _context.SaveChangesAsync() >= 0;                
                    if (success)
                    {
                        var toReturn = _mapper.Map<SitePage, SitePageDto>(sitePage);
                        return toReturn;
                    }

                }catch(Exception ex){
                     throw new Exception(ex.Message);
                }
						
                throw new Exception("Problem saving changes");
            }
        }

    }
}
