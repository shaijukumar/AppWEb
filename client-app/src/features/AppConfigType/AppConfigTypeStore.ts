
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppConfigType, IAppConfigType } from "./AppConfigType";

const IAppConfigTypeAPI = "/AppConfigType";

const DBFun = {
  list: (): Promise<IAppConfigType[]> => agent.requests.get(IAppConfigTypeAPI),
  details: (Id: number) => agent.requests.get(`${IAppConfigTypeAPI}/${Id}`),
  create: (item: IAppConfigType) => agent.requests.post(IAppConfigTypeAPI, item),
  update: (item: IAppConfigType) =>
    agent.requests.put(`${IAppConfigTypeAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppConfigTypeAPI}/${Id}`),
};

export default class AppConfigTypeStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppConfigType[] = [];
  item: AppConfigType = new AppConfigType()

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
      return this.itemList;          
    } catch (error) {
      return error;
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

 editItem = async (item: IAppConfigType) => {    
    this.loading = true;
    try {        
      let itm = new  AppConfigType();
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

export const AppConfigTypeContext = createContext(new AppConfigTypeStoreImpl());

