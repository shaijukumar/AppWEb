export interface IAppHistory {
	Id: number
	Action: string
	FromStage: number
	ToStage: number
	ActionBy: number
	DateTime: Date
	Comment: string
	Details1: string
	Details2: string
	Details3: string
	Details4: string
	Details5: string
}

export class AppHistory implements IAppHistory {
	Id: number = 0;
	Action: string = '';
	FromStage: number = 0;
	ToStage: number = 0;
	ActionBy: number = 0;
	DateTime: Date = new Date() ;
	Comment: string = '';
	Details1: string = '';
	Details2: string = '';
	Details3: string = '';
	Details4: string = '';
	Details5: string = '';
  
  constructor(init?: IAppHistory) {
    Object.assign(this, init);
  }
}

