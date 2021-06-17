export interface IUser {
    Username: string;
    DisplayName: string;
    Token: string;
    image?: string;
    Email?: string;
    PhoneNumber?: string;
    IsActive?:boolean;
  }
  
  export interface IUserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
    Email?: string;
    PhoneNumber?: string;
    IsActive?:boolean;
  }

  export class User implements IUser{
    Username: string = '';
    DisplayName: string= ''
    Token: string= ''
    image?: string= '';
    Email?: string= '';
    PhoneNumber?: string= '';
    IsActive?:boolean = false;
    constructor(init?: IUser) {
      Object.assign(this, init);
    }

  }


  