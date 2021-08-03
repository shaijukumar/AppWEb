import { Button, Grid, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import XLSX from "xlsx";

import { AppTheme } from "../../app/common/Theme";
import { AppFlowContext } from "../AppFlow/AppFlowStore";
import { AppTableMasterContext } from './AppTableMasterStore';
import { observer } from 'mobx-react-lite';
import { AppTableMaster } from "./AppTableMaster";
import { AppColumnMasterContext } from "../AppColumnMaster/AppColumnMasterStore";
import { AppActionContext } from "../AppAction/AppActionStore";
import { AppStatusListContext } from "../AppStatusList/AppStatusListStore";
import { AppExport } from "../AppAction/AppAction";
import { AppColumnExport, AppColumnMaster } from "../AppColumnMaster/AppColumnMaster";
import { ColumnAttachmentType, ColumnDataType } from "../../app/common/SystemConstants";
import { AppConfigTypeContext } from "../AppConfigType/AppConfigTypeStore";
import { AppConfigType, IAppConfigType } from "../AppConfigType/AppConfigType";

interface Parms {
    tableId : number;  
    showTitle? : boolean;
    flowId?: string;

  }

const TableDetails: React.FC<Parms> = ({ tableId, showTitle = true, flowId }) => {

   const AppTableMasterStore = useContext(AppTableMasterContext);
   const AppFlowStore = useContext(AppFlowContext);
   const AppColumnMasterStore = useContext(AppColumnMasterContext);
   const AppActionStore = useContext(AppActionContext); 
   const AppStatusListStore = useContext(AppStatusListContext);
   const AppConfigTypeStore = useContext(AppConfigTypeContext);

   
   let history = useHistory();

   useEffect(() => {
    
      if(showTitle){
         AppTableMasterStore.loadItem(tableId).then( (res:any) => {
            AppFlowStore.getFlowList( res.Id );            
         } );
      }              
   },[ tableId, showTitle, flowId, AppTableMasterStore, AppTableMasterStore.loadItem, AppFlowStore, AppFlowStore.getFlowList]);
   

   const navigateToPath = (path:string) => {        
        history.push(path);        
   };

   const  buttonStyle = {
      marginRight:'5px', marginLeft:'5px'
   };


   const ExcelReport = (FileName:string) => {   

     
      var wb = XLSX.utils.book_new();
      wb.Props = {
         Title: FileName,
         Subject: FileName,         
      };

      var tabArr:AppTableMaster[] = [];
      tabArr.push(AppTableMasterStore.item);
      
      const table: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tabArr);
      var wscols = [ {wch:5}, {wch:30}, {wch:20} ]; 
      table["!cols"] = wscols;            
      XLSX.utils.book_append_sheet(wb, table, 'Table') 
      
      
      AppConfigTypeStore.getList().then( (configTyps:any) => { 

         AppColumnMasterStore.getColumnList(AppTableMasterStore.item.Id).then( (colList:any) => {
            
            var colLstRes:AppColumnExport[] = []; 
         
            debugger;
            colList.forEach(function (col:any) {

               var colRes = new AppColumnExport();
               colRes.Title = col.Title;
               if(col.Type){
                  var v = ColumnDataType.find( u => u.Id === col.Type );
                  if(v){
                     colRes.Type = (v as any).value ? (v as any).value : ''; 
                  }              
               }
               if(col.ConfigId){
                  var v1:any =  configTyps.find( (u:any) => u.Id === col.ConfigId ); //?.Title
                  if(v1){
                     colRes.Config = (v1 as any).Title ? (v1 as any).Title : ''; 
                  }
               }
               if(col.AttachmentConfig){
                  var v2 = ColumnAttachmentType.find( u => u.Id === col.AttachmentConfig.toString() );
                  if(v2){
                     colRes.AttachmentConfig = (v2 as any).value ? (v2 as any).value : ''; 
                  }
                  //colRes.AttachmentConfig = '##'; 
                  //col.AttachmentConfig; ColumnAttachmentType.find( u => u.Id === item.AttachmentConfig.toString() )

               }
                           
               colLstRes.push(colRes);
            });
                     
            AppStatusListStore.getStatusList(AppTableMasterStore.item.Id).then( (statusList:any) => {

               const statList: XLSX.WorkSheet = XLSX.utils.json_to_sheet(statusList);      
               var wscols = [ {wch:5}, {wch:20}, {wch:20}, {wch:20}, {wch:20} ]; 
               statList["!cols"] = wscols;      
               XLSX.utils.book_append_sheet(wb, statList, 'StatusList');
               
               const columnList: XLSX.WorkSheet  = XLSX.utils.json_to_sheet(colLstRes);  
               var wscols = [ {wch:5}, {wch:20}, {wch:30}, {wch:20}, {wch:20}, {wch:15}, {wch:15}, {wch:15} ];                                              
               columnList["!cols"] = wscols; 
               XLSX.utils.book_append_sheet(wb, columnList, 'ColumnList');

               const flowList: XLSX.WorkSheet  = XLSX.utils.json_to_sheet(AppFlowStore.tableFlows); 
               var wscols = [ {wch:5}, {wch:20}, {wch:20} ];         
               flowList["!cols"] = wscols;     
               XLSX.utils.book_append_sheet(wb, flowList, 'FlowList');

               var flows = AppFlowStore.tableFlows;      
               if(flows.length == 0){
                  XLSX.writeFile(wb, FileName, {bookType:'xlsx', type: 'binary'});
               }
               else{
                  var couter = 0;         
                  AppFlowStore.tableFlows.forEach(function (value) {
                     AppActionStore.flowActions(value.Id).then( (actions:any) => {

                        if(actions){
                           var ActList:any[] = [];
                           actions.forEach(function (act:any) {

                              var actRes:AppExport = new AppExport();                        
                              actRes.Order = act.Order;
                              actRes.FlowName = value.Title;
                              actRes.ActionType = act.ActionType;
                              
                              if(act.FromStatusList ){                              
                                 var strFrom = "";   
                                 act.FromStatusList.forEach(function (fromAct:any) {
                                    strFrom += fromAct.Title + ",";
                                 });   
                                 actRes.FromStatus = strFrom;
                              } 

                              actRes.Action = act.Action;
                              if(act.ToStatusId ){
                                 actRes.ToStatus = statusList.filter( (x:any) => x.Id === act.ToStatusId )[0].Title;
                              }
                              actRes.WhenXml = act.WhenXml;
                              actRes.ActionXml = act.ActionXml;                           

                              if(act.InitStatus ){
                                 actRes.InitStatus = "Yes";
                              }
                              else{
                                 actRes.InitStatus = "No";
                              }                                
                              ActList.push(actRes);                                                 
                           });
                        
                           const actionList: XLSX.WorkSheet  = XLSX.utils.json_to_sheet(ActList);  
                           var wscols = [ {wch:5}, {wch:15}, {wch:9}, {wch:10}, {wch:20}, {wch:20}, {wch:20}, {wch:50}, {wch:50} ];                                              
                           actionList["!cols"] = wscols;        
                           XLSX.utils.book_append_sheet(wb, actionList, value.Title);

                        }

                        

                        couter++;
                        if( couter == flows.length){
                           XLSX.writeFile(wb, FileName, {bookType:'xlsx', type: 'binary'}); 
                        }
                     });               
                  }); 
               }
               
            })
            
         });

      });

     

      
      
   };

   

    return (
        <Grid container spacing={1} style={{width:'100%'}}>
                       
            {showTitle &&
               <React.Fragment>
                  
                  <Typography variant="h6" gutterBottom style={{paddingLeft:15, paddingRight:30,color: AppTheme.TableTitleColor }} >
                     <span>{AppTableMasterStore.item.Title}</span> 
                  </Typography>
                  <Button style={buttonStyle} onClick={ () => navigateToPath(`/AppTableMasterList`)}
                   variant="text" size="small" color= "primary" >Table List</Button>
               </React.Fragment>
            }
            <Button style={buttonStyle}
              onClick={ () => navigateToPath(`/TableColumns/${tableId}`)} variant="contained" size="small" 
               color= {  history.location.pathname.includes('/TableColumns/') ? "secondary" : "primary" }
               >Columns</Button>

            <Button style={buttonStyle} onClick={ () => navigateToPath(`/TableStatusList/${tableId}`)} variant="contained" size="small" 
                color= {  history.location.pathname.includes('/TableStatusList/') ? "secondary" : "primary" }
                >Status List</Button>

            <Button style={buttonStyle} onClick={ () => navigateToPath(`/TableFlowList/${tableId}`)} variant="contained" size="small" 
                color= {  history.location.pathname.includes('/TableFlowList/') ? "secondary" : "primary" }
                >Flow List</Button>

            {showTitle && AppFlowStore.tableFlows.map( (row) => (
               <Button key={row.Id} style={buttonStyle} onClick={ () => navigateToPath(`/TableActions/${tableId}/${row.Id}`)} variant="contained" size="small" 
                  color= {  history.location.pathname.includes(`/TableActions/${tableId}/${row.Id}`) ? "secondary" : "primary" }
               >{row.Title}</Button>
            ))                        
            }

            {showTitle &&
               <Button style={buttonStyle} onClick={ () => {ExcelReport(`${AppTableMasterStore.item.Title}.xlsx`);} } variant="text" size="small" color= "primary" >Export</Button>
            }
            
        </Grid>

        
    );
}

export default observer(TableDetails);
