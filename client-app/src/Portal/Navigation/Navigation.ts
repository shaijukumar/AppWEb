import { AppUserRoleMaster } from "../Api/Api";

export interface IAppNavigation {
	Id: number
	Order: number
	Title: string
	Path: string
	Icon: string	
	Selected: boolean 
	UserAccessRoles : AppUserRoleMaster[]
}

export class AppNavigation implements IAppNavigation {
	Id: number = 0;
	Order: number = 0;
	Title: string = '';
	Path: string = '';
	Icon: string = '';	
	Selected: boolean = false;
	UserAccessRoles : AppUserRoleMaster[]= [];
  
  constructor(init?: IAppNavigation) {
    Object.assign(this, init);
  }
}

