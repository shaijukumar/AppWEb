import { isNullishCoalesce } from "typescript";
import { AppNotificationsMaster, IAppNotificationsMaster } from "../AppNotificationsMaster/AppNotificationsMaster";

export interface IAppNotifications {
	Id: number
	NotificationsMasterId: number
	UserId: string
	NextReminderTime: Date
	NoOfReminders: number
	ReadStatus: boolean
	NotificationsMaster : IAppNotificationsMaster
}

export class AppNotifications implements IAppNotifications {
	Id: number = 0;
	NotificationsMasterId: number = 0;
	UserId: string = '';
	NextReminderTime: Date = new Date();
	NoOfReminders: number = 0;
	ReadStatus: boolean = false;
	NotificationsMaster : IAppNotificationsMaster = new AppNotificationsMaster();
  
  constructor(init?: IAppNotifications) {
    Object.assign(this, init);
  }
}