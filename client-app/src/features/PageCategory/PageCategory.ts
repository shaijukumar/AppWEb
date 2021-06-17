export interface IPageCategory {
	Id: string
	Title: string
	Pid: string
	Prop1: string
	Prop2: string
	Prop3: string
	Prop4: string
}

export class PageCategory implements IPageCategory {
	Id: string = '';
	Title: string = '';
	Pid: string = '';
	Prop1: string = '';
	Prop2: string = '';
	Prop3: string = '';
	Prop4: string = '';
  
  constructor(init?: IPageCategory) {
    Object.assign(this, init);
  }
}

