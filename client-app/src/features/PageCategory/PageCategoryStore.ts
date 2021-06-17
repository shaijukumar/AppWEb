
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { PageCategory, IPageCategory } from "./PageCategory";

const IPageCategoryAPI = "/PageCategory";

const DBFun = {
  list: (): Promise<IPageCategory[]> => agent.requests.get(IPageCategoryAPI),
  details: (Id: string) => agent.requests.get(`${IPageCategoryAPI}/${Id}`),
  create: (item: IPageCategory) => agent.requests.post(IPageCategoryAPI, item),
  update: (item: IPageCategory) =>
    agent.requests.put(`${IPageCategoryAPI}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${IPageCategoryAPI}/${Id}`),
};

export default class PageCategoryStoreImpl {

  loading = false;
  updating = false;
  itemList: IPageCategory[] = [];
  item: PageCategory = new PageCategory()

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

 editItem = async (item: IPageCategory) => {  
   debugger;  
    this.loading = true;
    try {        
      let itm = new  PageCategory();
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

export const PageCategoryContext = createContext(new PageCategoryStoreImpl());

