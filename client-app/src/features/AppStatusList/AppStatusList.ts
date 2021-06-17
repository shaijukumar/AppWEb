export interface IAppStatusList {
	Id: number
	Title: string
	Order: number
	TableId: number
}

export class AppStatusList implements IAppStatusList {
	Id: number = 0;
	Title: string = '';
	Order: number = 0;
	TableId: number = 0;
  
  constructor(init?: IAppStatusList) {
    Object.assign(this, init);
  }
}

