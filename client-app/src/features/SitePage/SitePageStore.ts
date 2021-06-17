
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { SitePage, ISitePage } from "./SitePage";

const ISitePageAPI = "/SitePage";

const DBFun = {
  list: (): Promise<ISitePage[]> => agent.requests.get(ISitePageAPI),
  details: (Id: string) => agent.requests.get(`${ISitePageAPI}/${Id}`),
  create: (item: ISitePage) => agent.requests.post(ISitePageAPI, item),
  update: (item: ISitePage) =>
    agent.requests.put(`${ISitePageAPI}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${ISitePageAPI}/${Id}`),
};

export default class SitePageStoreImpl {

  loading = false;
  updating = false;
  itemList: ISitePage[] = [];
  item: SitePage = new SitePage()

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

 editItem = async (item: ISitePage) => {    
    this.loading = true;
    try {        
      let itm = new  SitePage();
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

export const SitePageContext = createContext(new SitePageStoreImpl());

