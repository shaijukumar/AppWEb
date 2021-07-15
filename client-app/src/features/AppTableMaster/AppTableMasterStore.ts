
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppTableMaster, IAppTableMaster } from "./AppTableMaster";

const IAppTableMasterAPI = "/AppTableMaster";

const DBFun = {
  list: (): Promise<IAppTableMaster[]> => agent.requests.get(IAppTableMasterAPI),
  details: (Id: number) => agent.requests.get(`${IAppTableMasterAPI}/${Id}`),
  create: (item: IAppTableMaster) => agent.requests.post(IAppTableMasterAPI, item),
  update: (item: IAppTableMaster) =>
    agent.requests.put(`${IAppTableMasterAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppTableMasterAPI}/${Id}`),
};

export default class AppTableMasterStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppTableMaster[] = [];
  item: AppTableMaster = new AppTableMaster()

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
      runInAction( () => {
        this.loading = false;            
        throw error;
      });
    }
  }

  loadItem = async (id: number) => {
    this.loading = true;
    try {
      //this.itemList = await DBFun.list(); 
      this.item = await DBFun.details(id);       
      this.loading = false;      
      return this.item;   
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
  }

 editItem = async (item: IAppTableMaster) => {    
    //this.loading = true;
    try {        
      let itm = new  AppTableMaster();
      if (item.Id) {
        itm = await DBFun.update(item);
      } else {
        itm = await DBFun.create(item);
      }
      //this.loading = false;         
      return itm;   
    } catch (error) {
      runInAction( () => {
        //this.loading = false;        
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
      return res;
    } catch (error) {    
      this.updating = false;  
      this.loading = false;             
      console.log(error);
      return error;
    }
  };  
}

export const AppTableMasterContext = createContext(new AppTableMasterStoreImpl());

