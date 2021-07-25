import { AppUser, AppUserRoleMaster, IAppUser, IAttachmentDetails } from "../Api/Api";

export interface IEmployee {
	Id: number
	TableItemId: number
	IsActive: boolean
	Name: string
	DOB:Date
	Country:number
	Passport?: IAttachmentDetails[]
	Salary: number
	Manager: IAppUser
	Roles: AppUserRoleMaster[]
}

export class Employee implements IEmployee {
	Id: number = 0;
	TableItemId: number = 0;
	IsActive: boolean = true;
	Name: string= '';
	DOB:Date = new Date();
	Country:number = 0;
	Passport?: IAttachmentDetails[]
	Salary: number = 0;
	Manager: IAppUser = new AppUser();
	Roles: AppUserRoleMaster[] = [];
			
  constructor(init?: IEmployee) {
    Object.assign(this, init);
  }
}