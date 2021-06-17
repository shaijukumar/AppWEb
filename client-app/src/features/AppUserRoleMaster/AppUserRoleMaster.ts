export interface IAppUserRoleMaster {
	Id: number
	Title: string
}

export class AppUserRoleMaster implements IAppUserRoleMaster {
	Id: number = 0;
	Title: string = '';
  
  constructor(init?: IAppUserRoleMaster) {
    Object.assign(this, init);
  }
}

