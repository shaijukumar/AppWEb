import { createContext } from "react";
import { observable, action, runInAction, makeObservable, configure } from "mobx";
import agent from "../../app/api/agent";
import { IToDo, ToDo } from "./ToDo";

configure({
  enforceActions: "never",
})
 
const IToDoAPI = "/ToDo";
const DBFun = {    
    list: (): Promise<IToDo[]> => agent.requests.get(IToDoAPI) ,
    details: (Id: string) => agent.requests.get(`${IToDoAPI}/${Id}`),
    create: (item: IToDo) => agent.requests.post(IToDoAPI, item),
    update: (item: IToDo) =>
      agent.requests.put(`${IToDoAPI}/${item.Id}`, item),
    delete: (Id: string) => agent.requests.del(`${IToDoAPI}/${Id}`),
  };

export class ToDoStoreImpl {

  loading = false;
  updating = false;
  itemList: IToDo[] = [];
  item: ToDo = new ToDo()

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

  @action getList = async () => {        
    this.loading = true;
    try {          
      this.itemList = await DBFun.list();       
      this.loading = false;                   
    } catch (error) {
      // runInAction( () => {
      //   this.loading = false;            
      //   throw error;
      // });
    }
  }

  loadItem = async (id: string) => {
    this.loading = true;
    try {
      this.itemList = await DBFun.list(); 
      this.item = await DBFun.details(id); 
      
      this.loading = false;      
      return this.item;   
      // runInAction(() => {
      //     this.loading = false;
      //     this.item = itm;
      //   });            
      //   return itm;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
  }

    @action editItem = async (item: IToDo) => {
      debugger;
      this.loading = true;
      try {        
        let itm = new ToDo();
        if (item.Id) {
          itm = await DBFun.update(item);
        } else {
          itm = await DBFun.create(item);
        }
  
        runInAction(() => {
          debugger;          
          this.loading = false;
        });     
        return itm;   
      } catch (error) {
        runInAction( () => {
          this.loading = false;
          console.log(error);
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

export const ToDoContext = createContext(new ToDoStoreImpl());