export interface IAppUserRole {
	Id: number
	UserId: string
	AppUserRoleMasterId: Number
}

export class AppUserRole implements IAppUserRole {
	Id: number = 0;
	UserId: string = '';
	AppUserRoleMasterId: Number = 0;
  
  constructor(init?: IAppUserRole) {
    Object.assign(this, init);
  }
}

