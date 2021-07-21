
export interface IAppNavigation {
	Id: number
	Title: string
	Path: string
	Icon: string	
	Selected: boolean 
	RolesId : string
	//Roles : IAppUserRoleMaster[]
}

export class AppNavigation implements IAppNavigation {
	Id: number = 0;
	Title: string = '';
	Path: string = '';
	Icon: string = '';	
	Selected: boolean = false;
	RolesId : string= '';
	//Roles : IAppUserRoleMaster[] = [];
  
  constructor(init?: IAppNavigation) {
    Object.assign(this, init);
  }
}

