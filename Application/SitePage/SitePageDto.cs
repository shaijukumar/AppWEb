using System;
using System.Collections.Generic;
using Domain;
using Newtonsoft.Json;

namespace Application._SitePage
{
    public class SitePageDto
    {
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string CatId { get; set; }
		//public ICollection<PageTagSitePageDto> PageTag { get; set; }
		public string Tags { get; set; }
		public PageTag TagId { get; set; }
		public string URLTitle { get; set; }
		public string PageHtml { get; set; }
    }
}
