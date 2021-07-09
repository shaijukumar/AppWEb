
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppUserRole, IAppUserRole } from "./AppUserRole";

const IAppUserRoleAPI = "/AppUserRole";

const DBFun = {
  list: (): Promise<IAppUserRole[]> => agent.requests.get(IAppUserRoleAPI),
  RoleList: (Role: number): Promise<IAppUserRole[]> => agent.requests.get(`${IAppUserRoleAPI}/RoleList/${Role}`),
  details: (Id: number) => agent.requests.get(`${IAppUserRoleAPI}/Details/${Id}`),
  //RoleList: (Role: number) => agent.requests.get(`${IAppUserRoleAPI}/RoleList/${Role}`),
  create: (item: IAppUserRole) => agent.requests.post(IAppUserRoleAPI, item),
  update: (item: IAppUserRole) =>
    agent.requests.put(`${IAppUserRoleAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppUserRoleAPI}/${Id}`),
};

export default class AppUserRoleStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppUserRole[] = [];
  item: AppUserRole = new AppUserRole()
  roleList: IAppUserRole[] = [];

  constructor() {
    makeObservable(this, {
         itemList: observable,
         roleList: observable,
         loading: observable,
         updating: observable,
         item: observable,
         getList: action,
         loadItem: action,
         editItem: action
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

  getRoleList = async (role: number) => {        
    this.loading = true;
    try {               
      this.roleList = await DBFun.RoleList(role);       
      this.loading = false;                   
    } catch (error) {
      runInAction( () => {
        this.loading = false;            
        throw error;
      });
    }
  }

  loadItem = async (id: number) => {
    this.loading = true;
    try {
      this.itemList = await DBFun.list(); 
      this.item = await DBFun.details(id); 
      //this.item.AppUserRoleMasterId = '1';

      this.loading = false;      
      return this.item;     
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
  }

 editItem = async (item: IAppUserRole) => {    
    this.loading = true;
    try {        
      let itm = new  AppUserRole();
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
}

export const AppUserRoleContext = createContext(new AppUserRoleStoreImpl());

