export interface IAppConfig {
	Id: number
	Title: string
	Order:number
	// Type: number
	ConfigTypeId : number;
	Det1: string
	Det2: string
	Det3: string
	Det4: string
	Det5: string
	//defaultSort: string
}

export class AppConfig implements IAppConfig {
	Id: number = 0;
	Title: string = '';
	Order:number = 0;
	// Type: number = 0;
	ConfigTypeId: number = 0;
	Det1: string = '';
	Det2: string = '';
	Det3: string = '';
	Det4: string = '';
	Det5: string = '';
	//defaultSort: string= 'desc';
  
  constructor(init?: IAppConfig) {
    Object.assign(this, init);
  }
}

