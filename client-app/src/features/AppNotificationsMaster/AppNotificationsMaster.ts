export interface IAppNotificationsMaster {
	Id: number
	Subject: string
	Body: string
	NextReminderTime: Date
	NoOfReminders: number
	Frequency: number
	Type: string
	DataId: number
	ToUsers: string
	CCUsers: string
	ToGroups: string
	CCGroups: string
}

export class AppNotificationsMaster implements IAppNotificationsMaster {
	Id: number = 0;
	Subject: string = '';
	Body: string = '';
	NextReminderTime: Date = new Date();
	NoOfReminders: number = 0;
	Frequency: number = 0;
	Type: string = '';
	DataId: number = 0;
	ToUsers: string = '';
	CCUsers: string = '';
	ToGroups: string = '';
	CCGroups: string = '';
  
  constructor(init?: IAppNotificationsMaster) {
    Object.assign(this, init);
  }
}

