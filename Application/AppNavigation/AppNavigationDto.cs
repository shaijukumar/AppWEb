using System;
using System.Collections.Generic;

namespace Application._AppNavigation
{
    public class AppNavigationDto
    {
		public int Id { get; set; }
		public string Title { get; set; }
		public string Path { get; set; }
		public string Icon { get; set; }
		public int Access { get; set; }
    }
}
