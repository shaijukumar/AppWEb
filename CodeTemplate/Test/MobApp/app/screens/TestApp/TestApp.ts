export interface ITestApp {
	Id: string
	Title: string
	Description: string
}

export class TestApp implements ITestApp {
	Id: string
	Title: string
	Description: string
  
  constructor(init?: ITestApp) {
    Object.assign(this, init);
  }
}

