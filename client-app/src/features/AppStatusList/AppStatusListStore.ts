
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppStatusList, IAppStatusList } from "./AppStatusList";

const IAppStatusListAPI = "/AppStatusList";

const DBFun = {
  list: (): Promise<IAppStatusList[]> => agent.requests.get(IAppStatusListAPI),
  AppStatusList: (Id: number): Promise<IAppStatusList[]> => agent.requests.get(`${IAppStatusListAPI}/AppStatusList/${Id}`),

  details: (Id: number) => agent.requests.get(`${IAppStatusListAPI}/Details/${Id}`),   
  create: (item: IAppStatusList) => agent.requests.post(IAppStatusListAPI, item),
  update: (item: IAppStatusList) =>
    agent.requests.put(`${IAppStatusListAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppStatusListAPI}/${Id}`),
};

export default class AppStatusListStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppStatusList[] = [];
  AppStatusList: IAppStatusList[] = [];
  item: AppStatusList = new AppStatusList()

  constructor() {
    makeObservable(this, {
         itemList: observable,
         AppStatusList: observable,
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
      return this.itemList;                    
    } catch (error) {
      runInAction( () => {
        this.loading = false;            
        throw error;
      });
    }
  }

  getStatusList = async (id: number) => {        
    this.loading = true;
    try {               
      this.AppStatusList = await DBFun.AppStatusList(id);       
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

 editItem = async (item: IAppStatusList) => {    
    this.loading = true;
    try {        
      let itm = new  AppStatusList();
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
      var res = await DBFun.delete(id);    
      this.updating = false;   
      this.loading = false;
      return res;
    } catch (error) {    
      this.updating = false;  
      this.loading = false;             
      //console.log(error);
      //throw error;
      return error;
    }
  };  
}

export const AppStatusListContext = createContext(new AppStatusListStoreImpl());

 