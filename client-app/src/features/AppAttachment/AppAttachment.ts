export interface IAppAttachment {
	Id: number
	AppDataId: number
	FileName: string
	Path: string
	Prop1: string
	Prop2: string
	Prop3: string
	Prop4: string
	Prop5: string
}

export class AppAttachment implements IAppAttachment {
	Id: number = 0;
	AppDataId: number = 0;
	FileName: string = '';
	Path: string = '';
	Prop1: string = '';
	Prop2: string = '';
	Prop3: string = '';
	Prop4: string = '';
	Prop5: string = '';
  
  constructor(init?: IAppAttachment) {
    Object.assign(this, init);
  }
}


export interface IApiAttachment {
	File: Blob;		
	FileName?: string
	Prop1?: string
	Prop2?: string
	Prop3?: string
	Prop4?: string
	Prop5?: string
}

export class ApiAttachment implements IApiAttachment {
	File: Blob = new Blob();	
	FileName: string = '';	
	Prop1: string = '';
	Prop2: string = '';
	Prop3: string = '';
	Prop4: string = '';
	Prop5: string = '';
  
  constructor(init?: IApiAttachment) {
    Object.assign(this, init);
  }
}


