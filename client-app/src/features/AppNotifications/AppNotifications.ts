export interface IAppNotifications {
	Id: number
	NotificationsMasterId: number
	UserId: string
	NextReminderTime: Date
	NoOfReminders: number
	ReadStatus: boolean
}

export class AppNotifications implements IAppNotifications {
	Id: number = 0;
	NotificationsMasterId: number = 0;
	UserId: string = '';
	NextReminderTime: Date = new Date();
	NoOfReminders: number = 0;
	ReadStatus: boolean = false;
  
  constructor(init?: IAppNotifications) {
    Object.assign(this, init);
  }
}

