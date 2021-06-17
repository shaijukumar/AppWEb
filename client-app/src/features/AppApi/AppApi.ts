export interface IAppApi {
	Id: number
	CustomerName: string
	CIF: number
}

export class AppApi implements IAppApi {
	Id: number = 0;
	CustomerName: string = '';
	CIF: number = 0;
  
  constructor(init?: IAppApi) {
    Object.assign(this, init);
  }
}
 
export interface IApiResult  {
	Id: number
	Result1: ICustomer[]
}

export class ApiResult implements IApiResult {
	Id: number = 0;
	Result1: ICustomer[] = [];
  
  constructor(init?: IApiResult ) {
    Object.assign(this, init);
  }
}

export interface ICustomer {
	Id: number
	CustomerName: string
	CIF: number
	StatusId: number
}

export class Customer implements ICustomer {
	Id: number = 0;
	CustomerName: string = '';
	CIF: number = 0;
	StatusId: number = 0;
  
  constructor(init?: ICustomer) {
    Object.assign(this, init);
  }
}


export interface ITaskAction {
	Id: number
	Action: string
}

export class TaskAction implements ITaskAction {
	Id: number = 0;
	Action: string = '';	

	constructor(init?: IAppApi) {
	Object.assign(this, init);
	}
}


export interface IApiAction {
	ActionId : number 
	ItemId : number
	ReturnFlow : string 
	Parm1 : string 
	Parm2 : string 
	Parm3 : string 
	Parm4 : string 
	Parm5 : string 
	Parm6 : string 
	Parm7 : string 
	Parm8 : string 
	Parm9 : string 
	Parm10 : string 	
}

export class AppApiAction implements IApiAction {
	ActionId : number = 0;
	ItemId : number = 0;
	ReturnFlow : string = '';
	Parm1 : string = '';
	Parm2 : string = '';
	Parm3 : string = '';
	Parm4 : string = '';
	Parm5 : string = '';
	Parm6 : string = '';
	Parm7 : string = '';
	Parm8 : string = '';
	Parm9 : string = '';
	Parm10  : string = '';
  
  constructor(init?: IApiAction) {
    Object.assign(this, init);
  }
}


