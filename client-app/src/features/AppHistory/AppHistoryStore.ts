
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppHistory, IAppHistory } from "./AppHistory";

const IAppHistoryAPI = "/AppHistory";

const DBFun = {
  list: (): Promise<IAppHistory[]> => agent.requests.get(IAppHistoryAPI),
  details: (Id: number) => agent.requests.get(`${IAppHistoryAPI}/${Id}`),
  create: (item: IAppHistory) => agent.requests.post(IAppHistoryAPI, item),
  update: (item: IAppHistory) =>
    agent.requests.put(`${IAppHistoryAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppHistoryAPI}/${Id}`),
};

export default class AppHistoryStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppHistory[] = [];
  item: AppHistory = new AppHistory()

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

 editItem = async (item: IAppHistory) => {    
    this.loading = true;
    try {        
      let itm = new  AppHistory();
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

export const AppHistoryContext = createContext(new AppHistoryStoreImpl());

