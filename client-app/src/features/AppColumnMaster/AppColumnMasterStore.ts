
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppColumnMaster, IAppColumnMaster } from "./AppColumnMaster";

const IAppColumnMasterAPI = "/AppColumnMaster";

const DBFun = {
  list: (): Promise<IAppColumnMaster[]> => agent.requests.get(IAppColumnMasterAPI),
  ColumnList: (Id: number): Promise<IAppColumnMaster[]> => agent.requests.get(`${IAppColumnMasterAPI}/ColumnList/${Id}`),
  details: (Id: number) => agent.requests.get(`${IAppColumnMasterAPI}/Details/${Id}`), 
  //details: (Id: number) => agent.requests.get(`${IAppUserRoleAPI}/Details/${Id}`),
  create: (item: IAppColumnMaster) => agent.requests.post(IAppColumnMasterAPI, item),
  update: (item: IAppColumnMaster) =>
    agent.requests.put(`${IAppColumnMasterAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppColumnMasterAPI}/${Id}`),
};

export default class AppColumnMasterStoreImpl {

  loading = false;
  updating = false;
  columnList: IAppColumnMaster[] = [];
  itemList: IAppColumnMaster[] = [];
  item: AppColumnMaster = new AppColumnMaster()

  constructor() {
    makeObservable(this, {
         itemList: observable,
         columnList: observable,
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

  getColumnList = async (id: number) => {        
    this.loading = true;
    try {               
      this.columnList = await DBFun.ColumnList(id);       
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

 editItem = async (item: IAppColumnMaster) => {    
    this.loading = true;
    try {        
      let itm = new  AppColumnMaster();
      if (item.Id) {
        itm = await DBFun.update(item);
      } else {
        itm = await DBFun.create(item);
      }
      this.loading = false;         
      return itm;   
    } catch (error) {
      // runInAction( () => {
      //   this.loading = false;        
      // });        
      // throw error;
      this.loading = false;
      return error;
    }
  };

  deleteItem = async (id: number) => {
    this.updating = true;
    this.loading = true;
    try {
      var re = await DBFun.delete(id);    
      this.updating = false;   
      this.loading = false;
      return re;
    } catch (error) {    
      this.updating = false;  
      this.loading = false;             
      console.log(error);
      return error;
    }
  };  
}

export const AppColumnMasterContext = createContext(new AppColumnMasterStoreImpl());

