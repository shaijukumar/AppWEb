export interface IAppColumnMaster {
	Id: number
	TableID: number
	Title: string
	Type: string
	UserAccess: string
	AppDataFiled: string 
	ConfigId: number
	AttachmentConfig: number

}

export class AppColumnMaster implements IAppColumnMaster {
	Id: number = 0;
	TableID: number = 0;
	Title: string = '';
	Type: string = '';
	UserAccess: string = '';
	AppDataFiled: string = '';
	ConfigId: number= 0;
	AttachmentConfig: number= 0;
  
  constructor(init?: IAppColumnMaster) {
    Object.assign(this, init);
  }
}

