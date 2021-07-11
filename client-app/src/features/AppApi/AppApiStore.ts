
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { ApiResult, AppApi,  AppApiAction,  Customer, DataResult, IApiAction, IAppApi, ICustomer, ITaskAction } from "./AppApi";

const IAppApiAPI = "/AppApi";

const DBFun = { 
  Execute: (action: FormData) => agent.requests.postForm(`${IAppApiAPI}/TakeAction`, action),  
  ExecuteQuery: (action: IApiAction) => agent.requests.post(`${IAppApiAPI}/Query`, action),  
  //FileDownload: (action: IApiAction) => agent.requests.post(`${IAppApiAPI}/Attachment`, action),
  FileDownload: (action: IApiAction) => agent.requests.downloadPost(`${IAppApiAPI}/Attachment`, action),
  ActionList: (FlowId: number, Id: number) =>  agent.requests.get(`${IAppApiAPI}/ActionList/${FlowId}?ItemId=${Id}`),
  

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

  dateResult : DataResult = new DataResult();  


  apiResult : ApiResult = new ApiResult();  
  itemList: ICustomer[] = [];
  item: Customer = new Customer();

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
      editItem: action,

      dateResult:  observable,
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

  FileDownload = async (action: IApiAction) => {
    this.loading = true;
    try {        
      debugger;
      //let itm = new ApiResult();
      var itm = await DBFun.FileDownload(action);  
      //this.apiResult = itm;
      return itm;
      //this.apiResult = await DBFun.Execute(action);                 
      //return this.apiResult;   
    } catch (error) {
      runInAction( () => {   

      });        
      throw error;
    }
  }

  GetData = async (action: IApiAction) => {
    this.loading = true;
    try {        
      //debugger;
      let itm = new DataResult();
      itm = await DBFun.ExecuteQuery(action);  
      this.dateResult = itm;
      this.loading = false;
      return itm;
      //this.apiResult = await DBFun.Execute(action);                 
      //return this.apiResult;   
    } catch (error) {
      runInAction( () => {   

      });        
      throw error;
    }
  }

  GetDataByActionId = async (ActionId: number) => {
    this.loading = true;
    let action: AppApiAction = new AppApiAction()
    action.ActionId = ActionId;      

    try {        
      //debugger;
      let itm = new DataResult();
      itm = await DBFun.ExecuteQuery(action);  
      this.dateResult = itm;
      this.loading = false;
      return itm;
      //this.apiResult = await DBFun.Execute(action);                 
      //return this.apiResult;   
    } catch (error) {
      runInAction( () => {   

      });        
      throw error;
    }
  }


  ExecuteQuery = async (action: IApiAction) => {
    this.loading = true;
    try {        
      //debugger;
      let itm = new ApiResult();
      itm = await DBFun.ExecuteQuery(action);  
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

  ExecuteAction = async (action: FormData) => {
    
    this.loading = true;
    try {        
      //debugger;
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

