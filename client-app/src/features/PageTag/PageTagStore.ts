
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { PageTag, IPageTag } from "./PageTag";

const IPageTagAPI = "/PageTag";

const DBFun = {
  list: (): Promise<IPageTag[]> => agent.requests.get(IPageTagAPI),
  details: (Id: string) => agent.requests.get(`${IPageTagAPI}/${Id}`),
  create: (item: IPageTag) => agent.requests.post(IPageTagAPI, item),
  update: (item: IPageTag) =>
    agent.requests.put(`${IPageTagAPI}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${IPageTagAPI}/${Id}`),
};

export default class PageTagStoreImpl {

  loading = false;
  updating = false;
  itemList: IPageTag[] = [];
  item: PageTag = new PageTag()

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
    try {      
      this.itemList = await DBFun.list();             
      this.loading = false;      
      return this.item;     
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
  }

  getTag = (id: string) => {
    //debugger;
    let label:string = '';
    for(let i=0;i<this.itemList.length;i++){
      if(this.itemList[i].Id == id){
        label = this.itemList[i].label;
      }
    }
    return label; 
  }

 editItem = async (item: IPageTag) => {    
    this.loading = true;
    try {        
      let itm = new  PageTag();
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

export const PageTagContext = createContext(new PageTagStoreImpl());

