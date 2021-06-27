using System;
using System.Collections.Generic;

namespace Application._AppHistory
{
    public class AppHistoryDto
    {
		public int Id { get; set; }
		public string Action { get; set; }
		public int FromStage { get; set; }
		public int ToStage { get; set; }
		public string ActionBy { get; set; }
		public DateTime DateTime { get; set; }
		public string Comment { get; set; }
		public string Details1 { get; set; }
		public string Details2 { get; set; }
		public string Details3 { get; set; }
		public string Details4 { get; set; }
		public string Details5 { get; set; }
    }
}
