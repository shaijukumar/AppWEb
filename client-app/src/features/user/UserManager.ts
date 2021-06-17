export interface IUserManager {
    DisplayName: string;
    Username: string;
    Email?: string;
    PhoneNumber?: string;     
    IsActive?:boolean;   
}

export class UserManager implements IUserManager {	
    DisplayName: string= '';
    Username: string= '';
    Email?: string= '';
    PhoneNumber?: string= '';   
    IsActive?:boolean = false;
  
  constructor(init?: IUserManager) {
    Object.assign(this, init);
  }
}

