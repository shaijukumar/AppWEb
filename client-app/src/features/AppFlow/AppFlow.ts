export interface IAppFlow {
	Id: number
	Title: string
}

export class AppFlow implements IAppFlow {
	Id: number = 0;
	Title: string = '';
  
  constructor(init?: IAppFlow) {
    Object.assign(this, init);
  }
}

