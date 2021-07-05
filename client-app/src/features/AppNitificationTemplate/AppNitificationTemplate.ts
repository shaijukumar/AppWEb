export interface IAppNitificationTemplate {
	Id: number
	Title: string
	Template: string
	Description: string
}

export class AppNitificationTemplate implements IAppNitificationTemplate {
	Id: number = 0;
	Title: string = '';
	Template: string = '';
	Description: string = '';
  
  constructor(init?: IAppNitificationTemplate) {
    Object.assign(this, init);
  }
}

