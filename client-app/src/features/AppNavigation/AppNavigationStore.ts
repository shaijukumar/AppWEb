
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppNavigation, IAppNavigation } from "./AppNavigation";

const IAppNavigationAPI = "/AppNavigation";

const DBFun = {
  list: (): Promise<IAppNavigation[]> => agent.requests.get(IAppNavigationAPI),
  details: (Id: number) => agent.requests.get(`${IAppNavigationAPI}/${Id}`),
  create: (item: IAppNavigation) => agent.requests.post(IAppNavigationAPI, item),
  update: (item: IAppNavigation) =>
    agent.requests.put(`${IAppNavigationAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppNavigationAPI}/${Id}`),
};

export default class AppNavigationStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppNavigation[] = [];
  item: AppNavigation = new AppNavigation()

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

 editItem = async (item: IAppNavigation) => {    
    this.loading = true;
    try {        
      let itm = new  AppNavigation();
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

export const AppNavigationContext = createContext(new AppNavigationStoreImpl());

