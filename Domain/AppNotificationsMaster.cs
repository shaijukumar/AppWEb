using System;

namespace Domain
{
    public class AppNotificationsMaster
    {
		public int Id { get; set; }
		public string Subject { get; set; }
		public string Body { get; set; }
		public DateTime NextReminderTime { get; set; }
		public int NoOfReminders { get; set; }
		public int Frequency { get; set; }
		public string Type { get; set; }
		public int DataId { get; set; }
		public string ToUsers { get; set; }
		public string CCUsers { get; set; }
		public string ToGroups { get; set; }
		public string CCGroups { get; set; }
    }
}

















