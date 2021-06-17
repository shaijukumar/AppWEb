export interface IAppTableMaster {
	Id: number
	Title: string
	UserAccess: string
	
}

export class AppTableMaster implements IAppTableMaster {
	Id: number = 0;
	Title: string = '';
	UserAccess: string = '';	
  
  constructor(init?: IAppTableMaster) {
    Object.assign(this, init);
  }
}

