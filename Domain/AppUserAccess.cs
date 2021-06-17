using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class AppUserAccess
    {
		[Key]
      	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	  	public int Id { get; set; }
		public string Title { get; set; }
		public string ActionScript { get; set; }
		public string Description { get; set; }
    }
}

















