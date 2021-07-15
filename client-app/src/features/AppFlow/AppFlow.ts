export interface IAppFlow {
	Id: number
	Title: string
	TableId: number
}

export class AppFlow implements IAppFlow {
	Id: number = 0;
	Title: string = '';
	TableId: number= 0;
  
  constructor(init?: IAppFlow) {
    Object.assign(this, init);
  }
}

