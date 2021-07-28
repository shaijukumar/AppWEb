import { Attachment, IAttachment, IAttachmentDetails } from "../../app/common/form/MyAttachment";
import { AppConfig, AppUser, AppUserRoleMaster, IAppConfig, IAppUser } from "../Api/Api";

export interface IEmployee {
	Id: number
	TableItemId: number
	IsActive: boolean
	Name: string
	DOB:Date
	Country:IAppConfig[]
	Passport?: IAttachment[]
	Salary: number
	Manager: IAppUser
	Roles: AppUserRoleMaster[]
}

export class Employee implements IEmployee {
	Id: number = 0;
	TableItemId: number = 0;
	IsActive: boolean = false;
	Name: string= '';
	DOB:Date = new Date();
	Country:IAppConfig[] = [];
	Passport?: Attachment[] = [];
	Salary: number = 0;
	Manager: IAppUser = new AppUser();
	Roles: AppUserRoleMaster[] = [];
			
  constructor(init?: IEmployee) {
    Object.assign(this, init);
  }
}