
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppData, IAppData } from "./AppData";

const IAppDataAPI = "/AppData";

const DBFun = {
  list: (): Promise<IAppData[]> => agent.requests.get(IAppDataAPI),
  details: (Id: string) => agent.requests.get(`${IAppDataAPI}/${Id}`),
  create: (item: IAppData) => agent.requests.post(IAppDataAPI, item),
  update: (item: IAppData) =>
    agent.requests.put(`${IAppDataAPI}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${IAppDataAPI}/${Id}`),
};

export default class AppDataStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppData[] = [];
  item: AppData = new AppData()

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

 editItem = async (item: IAppData) => {    
    this.loading = true;
    try {        
      let itm = new  AppData();
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

  deleteItem = async (id: string) => {
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

export const AppDataContext = createContext(new AppDataStoreImpl());

