export interface IAppNavigation {
	Id: number
	Order: number
	Title: string
	Path: string
	Icon: string	
	Selected: boolean 
	UserAccessRoles : string
}

export class AppNavigation implements IAppNavigation {
	Id: number = 0;
	Order: number = 0;
	Title: string = '';
	Path: string = '';
	Icon: string = '';	
	Selected: boolean = false;
	UserAccessRoles : string= '';
  
  constructor(init?: IAppNavigation) {
    Object.assign(this, init);
  }
}

