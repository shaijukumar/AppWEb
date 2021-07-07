using System;
using System.Collections.Generic;
using Domain;

namespace Application._AppNotifications
{
    public class AppNotificationsDto
    {
		public int Id { get; set; }
		public int NotificationsMasterId { get; set; }
		public string UserId { get; set; }
		// public DateTime NextReminderTime { get; set; }
		// public int NoOfReminders { get; set; }
		public bool ReadStatus { get; set; }		
		public AppNotificationsMaster NotificationsMaster { get; set; }				
		
    }
}
