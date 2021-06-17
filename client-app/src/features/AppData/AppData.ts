export interface IAppData {
	Id: string
	Title: string
	Value: string
}

export class AppData implements IAppData {
	Id: string = '';
	Title: string = '';
	Value: string = '';
  
  constructor(init?: IAppData) {
    Object.assign(this, init);
  }
}

