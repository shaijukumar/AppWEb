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
      
      var table = XLSX.utils.json_to_sheet(tabArr);            
      XLSX.utils.book_append_sheet(wb, table, 'Table') 
      
      

      AppColumnMasterStore.getColumnList(AppTableMasterStore.item.Id).then( (colList:any) => {
         
         var wscols = [
            {wch: 6}, // "characters"
            {wpx: 50}, // "pixels"
            ,
            {hidden: true} // hide column
         ];
        
         
         colList.forEach(function (col:any) {
            col.TableID = AppTableMasterStore.item.Title;
         });

         AppStatusListStore.getStatusList(AppTableMasterStore.item.Id).then( (statusList:any) => {

            var statList = XLSX.utils.json_to_sheet(statusList);            
            XLSX.utils.book_append_sheet(wb, statList, 'StatusList');

            var columnList = XLSX.utils.json_to_sheet(colList);            
            XLSX.utils.book_append_sheet(wb, columnList, 'ColumnList');

            var flowList = XLSX.utils.json_to_sheet(AppFlowStore.tableFlows);            
            XLSX.utils.book_append_sheet(wb, flowList, 'FlowList');

            var flows = AppFlowStore.tableFlows;      
            if(flows.length == 0){
               XLSX.writeFile(wb, FileName, {bookType:'xlsx', type: 'binary'});
            }
            else{
               var couter = 0;         
               AppFlowStore.tableFlows.forEach(function (value) {
                  AppActionStore.flowActions(value.Id).then( (actions:any) => {

                     //var actions = [{...actionsRes}];

                     if(actions){
                        var ActList:any[] = [];
                        actions.forEach(function (act:any) {

                           var actRes:AppExport = new AppExport(); //{...actRes}                          
                           actRes.Order = act.Order;
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
                        var wscols = [
                           {wch:5},
                           {wch:8},
                           {wch:8},
                           {wch:10},
                           {wch:15},
                           {wch:15},
                           {wch:50},
                           {wch:50}
                       ];
                       
                       //ws['!cols'] = wscols;  
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
