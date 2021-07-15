import { Button, Grid, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import { AppTheme } from "../../app/common/Theme";
import { AppFlowContext } from "../AppFlow/AppFlowStore";
import { AppTableMasterContext } from './AppTableMasterStore';
import { observer } from 'mobx-react-lite';

interface Parms {
    tableId : number;  
    showTitle? : boolean;
    flowId?: string;

  }

const TableDetails: React.FC<Parms> = ({ tableId, showTitle = true, flowId }) => {

   const AppTableMasterStore = useContext(AppTableMasterContext);
   const AppFlowStore = useContext(AppFlowContext);

   
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

    return (
        <Grid container spacing={1} style={{width:'1000px'}}>

            {showTitle &&
               <Typography variant="h6" gutterBottom style={{paddingLeft:15, paddingRight:30,color: AppTheme.TableTitleColor }} >
                  <span>{AppTableMasterStore.item.Title}</span> 
               </Typography>
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

            
        </Grid>

        
    );
}

export default observer(TableDetails);
