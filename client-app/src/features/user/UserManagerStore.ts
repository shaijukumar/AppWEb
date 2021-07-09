
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { IUserManager, UserManager } from "./UserManager";

const IUserManagerAPI = "/UserManager";

const DBFun = {
  list: (): Promise<IUserManager[]> => agent.requests.get(IUserManagerAPI),
  details: (Id: string) => agent.requests.get(`${IUserManagerAPI}/${Id}`),
  create: (item: IUserManager) => agent.requests.post(IUserManagerAPI, item),
  update: (item: IUserManager) =>
    agent.requests.put(`${IUserManagerAPI}/${item.Username}`, item),
//   delete: (Id: string) => agent.requests.del(`${IUserManagerAPI}/${Id}`),
};

export default class UserManagerStoreImpl {

  loading = false;
  updating = false;
  itemList: IUserManager[] = [];
  item: UserManager = new UserManager()

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

 editItem = async (item: IUserManager, id:string) => {  
    debugger;  
    this.loading = true;
    try {        
      let itm = new  UserManager();
      if (id) {
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
//     this.updating = true;
//     this.loading = true;
//     try {
//       await DBFun.delete(id);    
//       this.updating = false;   
//       this.loading = false;
//     } catch (error) {    
//       this.updating = false;  
//       this.loading = false;             
//       console.log(error);
//       throw error;
//     }
   };  
}

export const UserManagerContext = createContext(new UserManagerStoreImpl());