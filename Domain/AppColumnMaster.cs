using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class AppColumnMaster
    {
		[Key]
      	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	  	public int Id { get; set; }
		public int TableID { get; set; }
		public string Title { get; set; }
		public string Type { get; set; }
		public string AppDataFiled { get; set; }				
		public string UserAccess { get; set; }
    }

	 public class AppColumnType
	 {
 		public const string Text = "1";
		 public const string Number = "2";
		 public const string Float = "3";
		 public const string Bool = "4";
		 public const string DateTime = "5";
	 }

}

















