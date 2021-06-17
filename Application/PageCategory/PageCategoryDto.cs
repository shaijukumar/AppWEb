using System;
using System.Collections.Generic;

namespace Application._PageCategory
{
    public class PageCategoryDto
    {
		public Guid Id { get; set; }
		public string Title { get; set; }
		public Guid Pid { get; set; }
		public string Prop1 { get; set; }
		public string Prop2 { get; set; }
		public string Prop3 { get; set; }
		public string Prop4 { get; set; }
    }
}
