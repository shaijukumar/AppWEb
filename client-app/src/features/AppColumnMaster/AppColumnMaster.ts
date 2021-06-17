export interface IAppColumnMaster {
	Id: number
	TableID: number
	Title: string
	Type: string
	UserAccess: string
	AppDataFiled: string
}

export class AppColumnMaster implements IAppColumnMaster {
	Id: number = 0;
	TableID: number = 0;
	Title: string = '';
	Type: string = '';
	UserAccess: string = '';
	AppDataFiled: string = '';
  
  constructor(init?: IAppColumnMaster) {
    Object.assign(this, init);
  }
}

