export interface IAppUserRoleMaster {
	Id: string
	Name: string
}

export class AppUserRoleMaster implements IAppUserRoleMaster {
	Id: string = '';
	Name: string = '';
  
  constructor(init?: IAppUserRoleMaster) {
    Object.assign(this, init);
  }
}

export interface IAddRole {
	UserName: string
	RoleName: string
}

export class AddRole implements IAddRole {
	UserName: string = '';
	RoleName: string = '';
  
  constructor(init?: IAddRole) {
    Object.assign(this, init);
  }
}

export interface IRoleUser {
	Username: string;
    DisplayName: string;
    Token: string;
    image?: string;
    Email?: string;
    PhoneNumber?: string;
    IsActive?:boolean;
}



