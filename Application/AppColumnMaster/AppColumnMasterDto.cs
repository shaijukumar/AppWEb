using System;
using System.Collections.Generic;

namespace Application._AppColumnMaster
{
    public class AppColumnMasterDto
    {
		public int Id { get; set; }
		public int Order { get; private set; }
		public string TableID { get; set; }
		public string Title { get; set; }
		public string Type { get; set; }
		public string UserAccess { get; set; }
		public string AppDataFiled { get; set; }
		public int ConfigId { get; set; }	
		public int AttachmentConfig { get; set; }	
    }
}
