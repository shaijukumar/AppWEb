using System;
using System.Collections.Generic;

namespace Domain
{
    public class AppAction
    {
		public int Id { get; set; }	
		public int Order { get; set; }					
		public virtual ICollection<AppStatusList> FromStatusList { get; set; } 							
		public int ToStatusId { get; set; }						
		public string Action { get; set; }
		public string ActionType { get; set; }
		public string WhenXml { get; set; }
		public int FlowId { get; set; }
		public bool InitStatus { get; set; }
		public int TableId { get; set; }
		public string ActionXml { get; set; }		
    }
}

















