export interface IAppUserAccess {
	Id: number
	Title: string
	ActionScript: string
	Description: string
}

export class AppUserAccess implements IAppUserAccess {
	Id: number = 0;
	Title: string = '';
	ActionScript: string = '';
	Description: string = '';
  
  constructor(init?: IAppUserAccess) {
    Object.assign(this, init);
  }
}

