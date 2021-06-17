export interface IToDo {
    Id: string;
    Title: string;
}

export class ToDo implements IToDo { 
	Id: string = '';
	Title: string = '';
  
  constructor(init?: IToDo) {
    Object.assign(this, init);
  }
}

