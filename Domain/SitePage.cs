using System;
using System.Collections.Generic;

namespace Domain
{
    public class SitePage
    {
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string CatId { get; set; }
		//public virtual ICollection<PageTagSitePage> PageTag { get; set; }
		public string Tags { get; set; }
		public string URLTitle { get; set; }
		public string PageHtml { get; set; }
    }
}