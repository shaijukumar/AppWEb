import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { AnySrvRecord } from "dns";

//==============================================

export interface IAppApi {
	Id: number
	CustomerName: string
	CIF: number
}

export class AppApi implements IAppApi {
	Id: number = 0;
	CustomerName: string = '';
	CIF: number = 0;
  
  constructor(init?: IAppApi) {
    Object.assign(this, init);
  }
}

export interface IApiAction {
	ActionId : number 
	ItemId : number
	ReturnFlow : string 
	Parm1 : string 
	Parm2 : string 
	Parm3 : string 
	Parm4 : string 
	Parm5 : string 
	Parm6 : string 
	Parm7 : string 
	Parm8 : string 
	Parm9 : string 
	Parm10 : string 	
	
}
 
export class AppApiAction implements IApiAction {
	ActionId : number = 0;
	ItemId : number = 0;
	ReturnFlow : string = '';
	Parm1 : string = '';
	Parm2 : string = '';
	Parm3 : string = '';
	Parm4 : string = '';
	Parm5 : string = '';
	Parm6 : string = '';
	Parm7 : string = '';
	Parm8 : string = '';
	Parm9 : string = '';
	Parm10  : string = '';
	

  
  constructor(init?: IApiAction) {
    Object.assign(this, init);
  }
}

export interface IApiResult  {
	Id: number
	Result1: any[]
}

export class DataResult implements IApiResult {
	Id: number = 0;
	Result1: any[] = [];
  
  constructor(init?: IApiResult ) {
    Object.assign(this, init);
  }
}

export interface IApiResult  {
	Id: number
	Result1: any[]
}

export class ApiResult implements IApiResult {
	Id: number = 0;
	Result1: any[] = [];
  
  constructor(init?: IApiResult ) {
    Object.assign(this, init);
  }
}


export interface IAppStatusList {
	Id: number
	Title: string
	Order: number
	TableId: number
}

//==============================================

const IAppApiAPI = "/AppApi";

const DBFun = { 
  Execute: (action: FormData) => agent.requests.postForm(`${IAppApiAPI}/TakeAction`, action),  
  ExecuteQuery: (action: IApiAction) => agent.requests.post(`${IAppApiAPI}/Query`, action),    
  FileDownload: (action: IApiAction) => agent.requests.downloadPost(`${IAppApiAPI}/Attachment`, action),
  ActionList: (FlowId: number, Id: number) =>  agent.requests.get(`${IAppApiAPI}/ActionList/${FlowId}?ItemId=${Id}`),
  StatusList: (TableId: number)  =>  agent.requests.get(`${IAppApiAPI}/GetStatusList/${TableId}`),
  ConfigList: (type: number)  =>  agent.requests.get(`${IAppApiAPI}/GetConfigList/${type}`),
  UserList: ()  =>  agent.requests.get(`${IAppApiAPI}/GetUserList`),
  RoleList: ()  =>  agent.requests.get(`${IAppApiAPI}/GetRoleList`),
  

  list: (): Promise<any[]> => agent.requests.get(IAppApiAPI),
  details: (Id: number) => agent.requests.get(`${IAppApiAPI}/${Id}`),
  create: (item: any) => agent.requests.post(IAppApiAPI, item),
  update: (item: any) => agent.requests.put(`${IAppApiAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppApiAPI}/${Id}`),
};

export default class ApiImpl {

	
	getStatusList = async (id: number) => {		
		try {      		 
			return await DBFun.StatusList(id); 		  
		} catch (error) {
			return error;
		}
	}

	getUserList = async () => {		
		try {      		 
			return await DBFun.UserList(); 		  
		} catch (error) {
			return error;
		}
	}

	getRoleList = async () => {		
		try {      		 
			return await DBFun.RoleList(); 		  
		} catch (error) {
			return error;
		}
	}

	getConfigList = async (id: number) => {		
		try {      		 
			return await DBFun.ConfigList(id); 		  
		} catch (error) {
			return error;
		}
	}
	
	getActions = async (flowId: number, id: number) => {		
		try {      		 
			return await DBFun.ActionList(flowId, id); 		  
		} catch (error) {
			return error;
			}
	}

	ExecuteQuery = async (action: IApiAction) => {		
		try {        	
		  let itm = new ApiResult();
		  return await DBFun.ExecuteQuery(action);  		   
		} catch (error) {
			return error;
		}
	}

	ExecuteAction = async (action: FormData) => {    		
		try {        		  
			return await DBFun.Execute(action);  		
		} catch (error) {
			return error
		}
	}
}

export const ApiContext = createContext(new ApiImpl());

