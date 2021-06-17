
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppConfig, IAppConfig } from "./AppConfig";

const IAppConfigAPI = "/AppConfig";

const DBFun = {
  list: (): Promise<IAppConfig[]> => agent.requests.get(IAppConfigAPI),

  AppConfigList: (Id: number): Promise<IAppConfig[]> => agent.requests.get(`${IAppConfigAPI}/AppConfigList/${Id}`),
  details: (Id: number) => agent.requests.get(`${IAppConfigAPI}/Details/${Id}`), 

  //details: (Id: number) => agent.requests.get(`${IAppConfigAPI}/${Id}`),
  create: (item: IAppConfig) => agent.requests.post(IAppConfigAPI, item),
  update: (item: IAppConfig) =>
    agent.requests.put(`${IAppConfigAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppConfigAPI}/${Id}`),
};

export default class AppConfigStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppConfig[] = [];
  AppConfigList: IAppConfig[] = [];
  item: AppConfig = new AppConfig()

  constructor() {
    makeObservable(this, {
         itemList: observable,
         AppConfigList: observable,
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

  getConfigList = async (id: number) => {        
    this.loading = true;
    try {               
      this.AppConfigList = await DBFun.AppConfigList(id);       
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

 editItem = async (item: IAppConfig) => {    
    this.loading = true;
    try {        
      let itm = new  AppConfig();
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

export const AppConfigContext = createContext(new AppConfigStoreImpl());

