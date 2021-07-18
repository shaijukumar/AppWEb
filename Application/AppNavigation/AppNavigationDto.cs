using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Application._AppNavigation
{
    public class AppNavigationDto
    {
		public int Id { get; set; }
		public string Title { get; set; }
		public string Path { get; set; }
		public string Icon { get; set; }		
		public string RoleId {get; set;}		
    }
}
