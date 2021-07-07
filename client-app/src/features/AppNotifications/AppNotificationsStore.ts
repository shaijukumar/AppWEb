
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppNotifications, IAppNotifications } from "./AppNotifications";

const IAppNotificationsAPI = "/AppNotifications";

const DBFun = { 
  list: (): Promise<IAppNotifications[]> => agent.requests.get(`${IAppNotificationsAPI}/NotificationList`),
  count: (): Promise<IAppNotifications[]> => agent.requests.get(`${IAppNotificationsAPI}/NotificationCount`),
  details: (Id: number) => agent.requests.get(`${IAppNotificationsAPI}/${Id}`),
  create: (item: IAppNotifications) => agent.requests.post(IAppNotificationsAPI, item),
  update: (item: IAppNotifications) =>
    agent.requests.put(`${IAppNotificationsAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppNotificationsAPI}/${Id}`),
};

export default class AppNotificationsStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppNotifications[] = [];
  item: AppNotifications = new AppNotifications()

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

  getCount = async () => {           
    try {               
      return await DBFun.count();                              
    } catch (error) {
      runInAction( () => {                    
        throw error;
      });
    }
  }

  markRead = async (id: number) => {  
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

 editItem = async (item: IAppNotifications) => {    
    this.loading = true;
    try {        
      let itm = new  AppNotifications();
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

export const AppNotificationsContext = createContext(new AppNotificationsStoreImpl());

 