
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AppNitificationTemplate, IAppNitificationTemplate } from "./AppNitificationTemplate";

const IAppNitificationTemplateAPI = "/AppNitificationTemplate";

const DBFun = {
  list: (): Promise<IAppNitificationTemplate[]> => agent.requests.get(IAppNitificationTemplateAPI),
  details: (Id: number) => agent.requests.get(`${IAppNitificationTemplateAPI}/${Id}`),
  create: (item: IAppNitificationTemplate) => agent.requests.post(IAppNitificationTemplateAPI, item),
  update: (item: IAppNitificationTemplate) =>
    agent.requests.put(`${IAppNitificationTemplateAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppNitificationTemplateAPI}/${Id}`),
};
 
export default class AppNitificationTemplateStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppNitificationTemplate[] = [];
  item: AppNitificationTemplate = new AppNitificationTemplate()

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

 editItem = async (item: IAppNitificationTemplate) => {    
    this.loading = true;
    try {        
      let itm = new  AppNitificationTemplate();
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

export const AppNitificationTemplateContext = createContext(new AppNitificationTemplateStoreImpl());

