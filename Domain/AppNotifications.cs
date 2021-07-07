using System;

namespace Domain
{
    public class AppNotifications
    {
		public int Id { get; set; }
		public int NotificationsMasterId { get; set; }
		public string UserId { get; set; }
		public bool ReadStatus { get; set; }
		 public virtual AppNotificationsMaster NotificationsMaster { get; set; }
		// public DateTime NextReminderTime { get; set; }
		// public int NoOfReminders { get; set; }
		
    }
}

















