using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class AppAttachment
    {
		[Key]
      	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public int AppDataId { get; set; }
		public int AppDataColumn { get; set; }
		public string FileName { get; set; }
		public string Path { get; set; }
		public string Prop1 { get; set; }
		public string Prop2 { get; set; }
		public string Prop3 { get; set; }
		public string Prop4 { get; set; }
		public string Prop5 { get; set; }
    }
}

















