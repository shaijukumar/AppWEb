using System;

namespace Domain
{ 
    public class PageTagSitePage
    {
        public Guid SitePageId { get; set; }
        public virtual SitePage SitePage { get; set; }

        public Guid PageTagId { get; set; }
        public virtual PageTag PageTag { get; set; }
    }
} 