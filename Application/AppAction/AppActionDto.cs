using System;
using System.Collections.Generic;
using Application._AppStatusList;
using Domain;

namespace Application._AppAction
{
    public class AppActionDto
    {
		public int Id { get; set; }
		public string Action { get; set; }
		public ICollection<AppStatusListDto> FromStatusList { get; set; }
		public int ToStatusId { get; set; }	
		public string ActionType { get; set; }
		public string WhenXml { get; set; }
		public int FlowId { get; set; }
		public int InitStatus { get; set; }
		public int TableId { get; set; }
		public string ActionXml { get; set; }
    }
}
