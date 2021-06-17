using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class AppHistory
    {
		[Key]
      	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	  	public int Id { get; set; }
		public Guid AppDataId { get; set; }
		public string Action { get; set; }
		public int FromStage { get; set; }
		public int ToStage { get; set; }
		public int ActionBy { get; set; }
		public DateTime DateTime { get; set; }
		public string Comment { get; set; }
		public string Details1 { get; set; }
		public string Details2 { get; set; }
		public string Details3 { get; set; }
		public string Details4 { get; set; }
		public string Details5 { get; set; }
    }
}

















