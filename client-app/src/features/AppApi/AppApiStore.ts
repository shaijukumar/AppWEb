
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { ApiResult, AppApi, AppApiAction, Customer, IApiAction, IApiResult, IAppApi, ICustomer, ITaskAction } from "./AppApi";

const IAppApiAPI = "/AppApi";

const DBFun = {
  Execute: (action: FormData) => agent.requests.postForm(IAppApiAPI, action),  
  ActionList: (FlowId: number, Id: number) =>  agent.requests.get(`${IAppApiAPI}/${FlowId}?ItemId=${Id}`),
  

  list: (): Promise<IAppApi[]> => agent.requests.get(IAppApiAPI),
  details: (Id: number) => agent.requests.get(`${IAppApiAPI}/${Id}`),
  create: (item: IAppApi) => agent.requests.post(IAppApiAPI, item),
  update: (item: IAppApi) =>
    agent.requests.put(`${IAppApiAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppApiAPI}/${Id}`),
};

export default class AppApiStoreImpl {

  loading = false;
  updating = false;
  actionList: ITaskAction[] = [];
  apiResult : ApiResult = new ApiResult();
  
  itemList: ICustomer[] = [];
  item: Customer = new Customer()

  constructor() {
    makeObservable(this, {      
      actionList: observable,
      apiResult :  observable,

      itemList: observable,
      loading: observable,
      updating: observable,
      item: observable,
      getList: action,
      //loadItem: action,
      editItem: action
    });
  }

  getActions = async (flowId: number, id: number) => {
    this.loading = true;
    try {      
     
      this.actionList = await DBFun.ActionList(flowId, id); 
      this.loading = false;      
      return this.actionList;     
    } catch (error) {
        console.log(error);
        this.loading = false;
      }
  }

  //ExecuteAction = async (action: IApiAction) => {
   ExecuteAction = async (action: FormData) => {
    
    this.loading = true;
    try {        
      debugger;
      let itm = new ApiResult();
      itm = await DBFun.Execute(action);  
      this.apiResult = itm;
      return itm;
      //this.apiResult = await DBFun.Execute(action);                 
      //return this.apiResult;   
    } catch (error) {
      runInAction( () => {   

      });        
      throw error;
    }
  }


  // editItem = async (item: IAppAction) => {    
  //   this.loading = true;
  //   try {        
  //     let itm = new  AppAction();
  //     if (item.Id) {
  //       itm = await DBFun.update(item);
  //     } else {
  //       itm = await DBFun.create(item);
  //     }
  //     this.loading = false;         
  //     return itm;   
  //   } catch (error) {
  //     runInAction( () => {
  //       this.loading = false;        
  //     });        
  //     throw error;
  //   }
  // };



  // loadItem = async (id: number) => {
  //   this.loading = true;
  //   try {

  //     this.itemList = await DBFun.list(); 
  //     this.item = await DBFun.details(id); 
      
  //     this.loading = false;      
  //     return this.item;     
  //     } catch (error) {
  //       console.log(error);
  //       this.loading = false;
  //     }
  // }
 
  getList = async () => {        
    // this.loading = true;
    // try {       
      
    //   let action: AppApiAction = new AppApiAction()
    //   action.ActionId = 8; 
    //   this.apiResult = await DBFun.Execute(action);
    //   this.itemList = this.apiResult.Result1;
      
    //   //this.itemList = await DBFun.list();       
    //   this.loading = false;                   
    // } catch (error) {
    //   runInAction( () => {
    //     this.loading = false;            
    //     throw error;
    //   });
    // }
  }

  

 editItem = async (item: IAppApi) => {    
    this.loading = true;
    try {        
      let itm = new  AppApi();
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

export const AppApiContext = createContext(new AppApiStoreImpl());

