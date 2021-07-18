using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppNavigation
    {
		public int Id { get; set; }
		public string Title { get; set; }
		public string Path { get; set; }
		public string Icon { get; set; }
		//public int Access { get; set; }
		//public int RoleId1 { get; set; }				
		public virtual IdentityRole Role {get; set;}
				
    }
}

















