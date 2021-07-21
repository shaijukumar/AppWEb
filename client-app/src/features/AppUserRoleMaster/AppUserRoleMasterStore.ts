
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AddRole, AppUserRoleMaster, IAppUserRoleMaster, IRoleUser } from "./AppUserRoleMaster";

const IAppUserRoleMasterAPI = "/AppUserRoleMaster";

const DBFun = {
  list: (): Promise<IAppUserRoleMaster[]> => agent.requests.get(IAppUserRoleMasterAPI),
  details: (Id: string) => agent.requests.get(`${IAppUserRoleMasterAPI}/Details/${Id}`),
  create: (item: IAppUserRoleMaster) => agent.requests.post(`${IAppUserRoleMasterAPI}/CreateRole`, item),
  update: (item: IAppUserRoleMaster) =>
    agent.requests.put(`${IAppUserRoleMasterAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppUserRoleMasterAPI}/${Id}`),

  AddUserToRole: (item: AddRole) => agent.requests.post(`${IAppUserRoleMasterAPI}/AddUserToRole`, item),
  RoleUserList: (Id: string) => agent.requests.get(`${IAppUserRoleMasterAPI}/RoleUserList/${Id}`),
  RemoveUserFromRole: (item: AddRole) => agent.requests.post(`${IAppUserRoleMasterAPI}/RemoveUserFromRole`, item),
  
};

export default class AppUserRoleMasterStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppUserRoleMaster[] = [];
  item: AppUserRoleMaster = new AppUserRoleMaster();
  userList: IRoleUser[] = [];


  constructor() {
    makeObservable(this, {
         itemList: observable,
         loading: observable,
         updating: observable,
         item: observable,
         userList: observable,
         getList: action,
         loadItem: action,
         editItem: action,
         addUserToRole: action,
         roleUserList: action,
         
    });
  }

  getList = async () => {        
    this.loading = true;
    try {               
      this.itemList = await DBFun.list();       
      this.loading = false;                   
    } catch (error) {
      runInAction( () => {
        this.loading = false;            
        throw error;
      });
    }
  }

  loadItem = async (id: string) => {
    this.loading = true;
    try {
      this.itemList = await DBFun.list(); 
      this.item = await DBFun.details(id); 
      
      this.loading = false;      
      return this.item;     
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
  }

 editItem = async (item: IAppUserRoleMaster) => {    
    this.loading = true;
    try {        
      let itm = new  AppUserRoleMaster();
      if (item.Id) {
        itm = await DBFun.update(item);
      } else {
        itm = await DBFun.create(item);
      }
      this.loading = false;         
      return itm;   
    } catch (error) {
      runInAction( () => {
        this.loading = false;        
      });        
      throw error;
    }
  };

  deleteItem = async (id: number) => {
    this.updating = true;
    this.loading = true;
    try {
      await DBFun.delete(id);    
      this.updating = false;   
      this.loading = false;
    } catch (error) {    
      this.updating = false;  
      this.loading = false;             
      console.log(error);
      throw error;
    }
  }; 
  
  addUserToRole = async (item: AddRole) => {    
    this.loading = true;
    try {        
      var u = await DBFun.AddUserToRole(item);
      this.loading = false;         
      return u;   
    } catch (error) {
      runInAction( () => {
        this.loading = false;        
      });        
      throw error;
    }
  };

  
  roleUserList = async (id: string) => {
    this.loading = true;
    try {
      this.userList = await DBFun.RoleUserList(id);                
      this.loading = false;     
      return this.userList;  
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
  }

  RemoveUserFromRole = async (item: AddRole) => {    
    this.loading = true;
    try {        
      var u = await DBFun.RemoveUserFromRole(item);
      this.loading = false;         
      return u;   
    } catch (error) {
      runInAction( () => {
        this.loading = false;        
      });        
      throw error;
    }
  };

}

export const AppUserRoleMasterContext = createContext(new AppUserRoleMasterStoreImpl());


