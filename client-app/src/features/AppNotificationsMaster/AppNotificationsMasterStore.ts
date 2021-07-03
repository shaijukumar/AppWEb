
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppNotificationsMaster, IAppNotificationsMaster } from "./AppNotificationsMaster";

const IAppNotificationsMasterAPI = "/AppNotificationsMaster";

const DBFun = {
  list: (): Promise<IAppNotificationsMaster[]> => agent.requests.get(IAppNotificationsMasterAPI),
  details: (Id: number) => agent.requests.get(`${IAppNotificationsMasterAPI}/${Id}`),
  create: (item: IAppNotificationsMaster) => agent.requests.post(IAppNotificationsMasterAPI, item),
  update: (item: IAppNotificationsMaster) =>
    agent.requests.put(`${IAppNotificationsMasterAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppNotificationsMasterAPI}/${Id}`),
};

export default class AppNotificationsMasterStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppNotificationsMaster[] = [];
  item: AppNotificationsMaster = new AppNotificationsMaster()

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

 editItem = async (item: IAppNotificationsMaster) => {    
    this.loading = true;
    try {        
      let itm = new  AppNotificationsMaster();
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

export const AppNotificationsMasterContext = createContext(new AppNotificationsMasterStoreImpl());

