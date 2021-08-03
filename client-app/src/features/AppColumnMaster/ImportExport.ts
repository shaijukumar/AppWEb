import { StringifyOptions } from "querystring";
import { createContext } from "react";
import XLSX from "xlsx";
import agent from "../../app/api/agent";
import { AppExport } from "../AppAction/AppAction";
import { AppFlow } from "../AppFlow/AppFlow";
import { AppStatusList, IAppStatusList } from "../AppStatusList/AppStatusList";
import { AppTableMaster } from "../AppTableMaster/AppTableMaster";
import AppTableMasterStore from "../AppTableMaster/AppTableMasterStore";
import { AppColumnMaster } from "./AppColumnMaster";

const IAppStatusListAPI = "/AppStatusList";

const DBFun = {   
  createStatus: (item: IAppStatusList) => agent.requests.post(IAppStatusListAPI, item),  
};

export default class ImportExportImpl {


    ImportTable = (evt:any) => {
                
        debugger;
        var files = evt.target.files; // FileList object
        var xl2json = new ExcelToJSON();
        //xl2json.parseExcel(files[0]);
        evt.target.value = null;                  
      };

    getList = async () => {  

    }    

    update= async (TableName:string, statusList:AppStatusList[], columnList:AppColumnMaster[], flowList:AppFlow[], actionList:AppExport[]) => {
        var err = '';
        // ( async() => { 

        //     //Create Table
        //     var tab = new AppTableMaster();
        //     tab.Title = TableName;
        //     var tableObj = await AppTableMasterStore.editItem(tab);

        //     var stCouter = 0;
        //     statusList.forEach(function (status:AppStatusList) {            
        //         status.TableId = tableObj.Id;  
        //         //var itm = await DBFun.createStatus(status);

        //         //stCouter++; 
        //         // AppStatusListStore.editItem(status).then( (stRes:AppStatusList) =>{
        //         //     status.Id = stRes.Id;
        //         //     if( stCouter ==  statusList.length ){
        //         //     //Update ColumnList

        //         //     }
        //         // }) 

        //     });
        // })();
        
        return err;
    }
}

class ExcelToJSON {
      
           
  };



export const ImportExportContext = createContext(new ImportExportImpl());