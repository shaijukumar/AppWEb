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
		public int Order { get; set; }		  		  
		public int TableID { get; set; }
		public string Title { get; set; }
		public string Type { get; set; }
		public string AppDataFiled { get; set; }				
		public string UserAccess { get; set; }
		public int ConfigId { get; set; }	
		public int AttachmentConfig { get; set; }
    }

	 public class AppColumnType
	 {
		public const string Text = "1";
		public const string Number = "2";
		public const string Float = "3";
		public const string Bool = "4";
		public const string DateTime = "5";
		public const string Config = "6";
		public const string Attachment = "7";
		public const string LongNumber = "8";
		public const string User = "9";
		public const string Role = "10";
	}

	 public class AppAttachmentConfig
	 {
 		public const string NoDelete = "1";
		public const string CreaterOnlyDelete = "2";

	}
}

















