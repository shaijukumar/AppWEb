
export interface IDataResult  {
	Id: number
	Result1: any[]
}

export class DataResult implements IDataResult {
	Id: number = 0;
	Result1: any[] = [];
  
  constructor(init?: IDataResult ) {
    Object.assign(this, init);
  }
}

//------------------------------------

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
	ApprovalComment: string
	InitAttachment?: IAttachmentDetails[];
	FlowAttachment?: IAttachmentDetails[];
	AppHistory : History[]
}

export class Customer implements ICustomer {
	Id: number = 0;
	CustomerName: string = '';
	CIF: number = 0;
	StatusId: number = 0;
	ApprovalComment:  string = '';
	InitAttachment: IAttachmentDetails[] = [];
	FlowAttachment: IAttachmentDetails[] = [];
	AppHistory : History[] = [];
	
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

export interface IAttachmentDetails {
	Action: string
	FileArrayId?: number
	Id?: number	
	FileName: string	
	Prop1?: string
	Prop2?: string
	Prop3?: string
	Prop4?: string
	Prop5?: string
}

// AppDataColumn: 8
// AppDataId: 38
// FileName: "0-EIB B.JPG"
// Id: 64
// Path: "..\\..\\..\\.."
// Prop1: "Desc 1"
// Prop2: ""
// Prop3: ""
// Prop4: ""
// Prop5: ""

export class AttachmentDetails implements IAttachmentDetails {
	Action: string = '';
	FileArrayId: number = -1;
	Id: number = -1;	
	FileName: string = '';	
	Prop1: string = '';
	Prop2: string = '';
	Prop3: string = '';
	Prop4: string = '';
	Prop5: string = '';

  constructor(init?: IAttachmentDetails) {
    Object.assign(this, init);
  }
}

export interface IAttachment {
	file: Blob
	Details : AttachmentDetails
}

export class Attachment implements IAttachment {
	file: Blob = new Blob();
	Details : AttachmentDetails = new AttachmentDetails();
	  
  constructor(init?: IAttachment) {
    Object.assign(this, init);
  }
}

export interface IHistory {
	Id: number
	Action: string
	FromStage: number
	ToStage: number
	ActionBy: string
	DateTime: Date
	Comment: string
	Details1: string
	Details2: string
	Details3: string
	Details4: string
	Details5: string
}

export class History implements IHistory {
	Id: number = 0;
	Action: string = '';
	FromStage: number = 0;
	ToStage: number = 0;
	ActionBy: string = "";
	DateTime: Date = new Date() ;
	Comment: string = '';
	Details1: string = '';
	Details2: string = '';
	Details3: string = '';
	Details4: string = '';
	Details5: string = '';
  
  constructor(init?: IHistory) {
    Object.assign(this, init);
  }
}






