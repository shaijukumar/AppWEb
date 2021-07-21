
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppFlow, IAppFlow } from "./AppFlow";

const IAppFlowAPI = "/AppFlow";

const DBFun = {
  list: (): Promise<IAppFlow[]> => agent.requests.get(IAppFlowAPI),
  details: (Id: number) => agent.requests.get(`${IAppFlowAPI}/Details/${Id}`),
  create: (item: IAppFlow) => agent.requests.post(IAppFlowAPI, item),
  update: (item: IAppFlow) =>
    agent.requests.put(`${IAppFlowAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppFlowAPI}/${Id}`),
  TableFlows: (TableId: number) => agent.requests.get(`${IAppFlowAPI}/TableFlows/${TableId}`),
};

export default class AppFlowStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppFlow[] = [];
  tableFlows: IAppFlow[] = [];
  item: AppFlow = new AppFlow()

  constructor() {
    makeObservable(this, {
         itemList: observable,
         tableFlows: observable,
         loading: observable,
         updating: observable,
         item: observable,
         getList: action,
         loadItem: action,
         editItem: action
    });
  }

  getFlowList = async (tableId: number) => {        
    this.loading = true;
    try {               
      this.tableFlows = await DBFun.TableFlows(tableId);       
      this.loading = false; 
      return this.tableFlows;                   
    } catch (error) {
      this.loading = false;    
      return error;
    }
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

 editItem = async (item: IAppFlow) => {    
    this.loading = true;
    try {        
      let itm = new  AppFlow();
      if (item.Id) {
        itm = await DBFun.update(item);
      } else {
        itm = await DBFun.create(item);
      }
      this.loading = false;         
      return itm;   
    } catch (error) {
      this.loading = false;
      return error;
    }
  };

  deleteItem = async (id: number) => {
    this.updating = true;
    this.loading = true;
    try {
      var ret = await DBFun.delete(id);    
      this.updating = false;   
      this.loading = false;
      return ret;
    } catch (error) {    
      this.updating = false;  
      this.loading = false;             
      console.log(error);
      throw error;
    }
  };  
}

export const AppFlowContext = createContext(new AppFlowStoreImpl());

