
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { _Feature_, I_Feature_ } from "./_Feature_";

const I_Feature_API = "/_Feature_";

const DBFun = {
  list: (): Promise<I_Feature_[]> => agent.requests.get(I_Feature_API),
  details: (Id: string) => agent.requests.get(`${I_Feature_API}/${Id}`),
  create: (item: I_Feature_) => agent.requests.post(I_Feature_API, item),
  update: (item: I_Feature_) =>
    agent.requests.put(`${I_Feature_API}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${I_Feature_API}/${Id}`),
};

export default class _Feature_StoreImpl {

  loading = false;
  updating = false;
  itemList: I_Feature_[] = [];
  item: _Feature_ = new _Feature_()

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

 editItem = async (item: I_Feature_) => {    
    this.loading = true;
    try {        
      let itm = new  _Feature_();
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

export const _Feature_Context = createContext(new _Feature_StoreImpl());
