export interface IAppConfigType {
	Id: number
	Title: string
	Description: string
}

export class AppConfigType implements IAppConfigType {
	Id: number = 0;
	Title: string = '';
	Description: string = '';
  
  constructor(init?: IAppConfigType) {
    Object.assign(this, init);
  }
}

