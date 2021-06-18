
import { createContext } from "react";
import { observable, action, runInAction, makeObservable } from "mobx";
import agent from "../../app/api/agent";
import { ApiAttachment, AppAttachment, IAppAttachment } from "./AppAttachment";

const IAppAttachmentAPI = "/AppAttachment";

const DBFun = {
  list: (): Promise<IAppAttachment[]> => agent.requests.get(IAppAttachmentAPI),
  details: (Id: number) => agent.requests.get(`${IAppAttachmentAPI}/${Id}`),
  create: (item: IAppAttachment) => agent.requests.post(IAppAttachmentAPI, item),
  update: (item: IAppAttachment) =>
    agent.requests.put(`${IAppAttachmentAPI}/${item.Id}`, item),
  delete: (Id: number) => agent.requests.del(`${IAppAttachmentAPI}/${Id}`),
  
  download: (Id: number) => agent.requests.download(`${IAppAttachmentAPI}/${Id}`),
  
  uploadPhoto: (formData : FormData): Promise<IAppAttachment> => agent.requests.postForm(`${IAppAttachmentAPI}`, formData),
};

export default class AppAttachmentStoreImpl {

  loading = false;
  updating = false;
  itemList: IAppAttachment[] = [];
  item: AppAttachment = new AppAttachment()

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

 editItem = async (item: IAppAttachment) => {    
    this.loading = true;
    try {        
      let itm = new  AppAttachment();
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

  download = async (id: number, fileName: string) => {
    debugger;
    try {
      await DBFun.download(id).then(  (fileSteam) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([fileSteam]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileName); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      } );              
    } catch (error) {    
      this.updating = false;  
      this.loading = false;             
      console.log(error);
      throw error;
    }
  }; 

  uploadPhoto = async (formData : FormData) => {
  
    try {
        const photo = await DBFun.uploadPhoto(formData); 
        debugger;
       
    } catch (error) {
      debugger;
    }
  }

}



export const AppAttachmentContext = createContext(new AppAttachmentStoreImpl());

