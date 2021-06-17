
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppUserRoleMaster, IAppUserRoleMaster } from "./AppUserRoleMaster";

const IAppUserRoleMasterAPI = "/AppUserRoleMaster";

const DBFun = {
  list: (): Promise<IAppUserRoleMaster[]> => agent.requests.get(IAppUserRoleMasterAPI),
  details: (Id: number) => agent.requests.get(`${IAppUserRoleMasterAPI}/${Id}`),
  create: (item: IAppUserRoleMaster) => agent.requests.post(IAppUserRoleMasterAPI, item),
  update: (item: IAppUserRoleMaster) =>
    agent.requests.put(`${IAppUserRoleMasterAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppUserRoleMasterAPI}/${Id}`),
};

export default class AppUserRoleMasterStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppUserRoleMaster[] = [];
  item: AppUserRoleMaster = new AppUserRoleMaster()

  constructor() {
    makeObservable(this, {
         itemList: observable,
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

  loadItem = async (id: number) => {
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
}

export const AppUserRoleMasterContext = createContext(new AppUserRoleMasterStoreImpl());

