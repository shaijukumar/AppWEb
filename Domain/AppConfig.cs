using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class AppConfig
    {
		[Key]
      	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string Title { get; set; }
		public int Order { get; set; }				
		public int Type { get; set; }
		public int ConfigTypeId { get; set; }				
		public virtual AppConfigType ConfigType { get; set; } 
		public string Det1 { get; set; }
		public string Det2 { get; set; }
		public string Det3 { get; set; }
		public string Det4 { get; set; }
		public string Det5 { get; set; }
    }
}

















