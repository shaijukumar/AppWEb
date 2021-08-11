import { IAttachment } from '../../app/common/form/MyAttachment';
import { IAppConfig } from '../Api/Api';

export interface ITestOne {
	Id: number
	Title: string
	Order: number
	IsActive: boolean
	DOB: Date
	Document: IAttachment[]
	Country: IAppConfig[]
	Salary: number
}

export class TestOne implements ITestOne {
	Id: number = 0;
	Title: string = '';
	Order: number = 0;
	IsActive: boolean = false;
	DOB: Date =  new Date();
	Document: IAttachment[] =  [];
	Country: IAppConfig[] =  [];
	Salary: number = 0;
  
  constructor(init?: ITestOne) {
    Object.assign(this, init);
  }
}

