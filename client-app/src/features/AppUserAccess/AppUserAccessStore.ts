
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppUserAccess, IAppUserAccess } from "./AppUserAccess";

const IAppUserAccessAPI = "/AppUserAccess";

const DBFun = {
  list: (): Promise<IAppUserAccess[]> => agent.requests.get(IAppUserAccessAPI),
  details: (Id: number) => agent.requests.get(`${IAppUserAccessAPI}/${Id}`),
  create: (item: IAppUserAccess) => agent.requests.post(IAppUserAccessAPI, item),
  update: (item: IAppUserAccess) =>
    agent.requests.put(`${IAppUserAccessAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppUserAccessAPI}/${Id}`),
};

export default class AppUserAccessStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppUserAccess[] = [];
  item: AppUserAccess = new AppUserAccess()

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

 editItem = async (item: IAppUserAccess) => {    
    this.loading = true;
    try {        
      let itm = new  AppUserAccess();
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

export const AppUserAccessContext = createContext(new AppUserAccessStoreImpl());

