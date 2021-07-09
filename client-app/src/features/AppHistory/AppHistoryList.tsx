import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AppHistoryContext } from './AppHistoryStore';
import { LinearProgress } from '@material-ui/core';
import MaterialTable from 'material-table';

import 'material-design-icons/iconfont/material-icons.css'
import { AppStatusListContext } from '../AppStatusList/AppStatusListStore';
import { IAppHistory } from './AppHistory';
import moment from 'moment';

const AppHistoryList: React.FC = () => {

 
  const AppHistoryStore = useContext(AppHistoryContext);  
  const AppStatusListStore = useContext(AppStatusListContext);   
  
    useEffect(() => {       
      AppStatusListStore.getList();
      AppHistoryStore.getList(); 

      console.log(React.version);         
    }, [AppHistoryStore, AppHistoryStore.getList, AppStatusListStore])       

    if(AppHistoryStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }       
    
    const histColumns = [
      {
        title: "Id",
        field: "Id",
      },
      {
        title: "Action",
        field: "Action",
        lookup: { "Resubmit": 'Resubmit', "Approve": 'Approve', "New Request" : "New Request", "Reject" : "Reject"},
      },
      {
        title: "FromStage",
        field: "FromStage",
        //render : rend
        render : (values: IAppHistory) => { return AppStatusListStore.itemList.find( u => u.Id ===values.FromStage )?.Title }
      },     
      {
        title: "ToStage",
        field: "ToStage",
        //render : rend
        render : (values: IAppHistory) => { return AppStatusListStore.itemList.find( u => u.Id ===values.FromStage )?.Title }
      }, 
      {
        title: "ActionBy",
        field: "ActionBy",    
      }, 
      {
        title: "DateTime",
        field: "DateTime",  
        render : (values: IAppHistory) => { return moment(values.DateTime).format("DD-MMM-YYYY")  }  
      },
      {
        title: "Comment",
        field: "Comment",    
      },
    ];


    return (
      
      <div className={"tabcontainers1"}>
        <div className={"tabcontainers2"} >        
          <MaterialTable                       
            title="App History"
            data={AppHistoryStore.itemList}
            columns={histColumns}
            options={{ search: true, paging: true, filtering: true, exportButton: true, pageSize:100 }}            
          />
        </div>
      </div>
     
    );
};

export default observer(AppHistoryList);
