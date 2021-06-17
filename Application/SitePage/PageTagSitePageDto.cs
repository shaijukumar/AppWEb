using System;
using Domain;
using System.Collections.Generic;

namespace Application._SitePage
{
    public class PageTagSitePageDto
    {        
        public Guid PageTagId { get; set; }    
        
        public Guid Id { get; set; }
        public String PageTagTitle { get; set; }      
    }
}