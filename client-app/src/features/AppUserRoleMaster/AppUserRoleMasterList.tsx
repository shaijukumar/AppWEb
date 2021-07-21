import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppUserRoleMasterContext } from './AppUserRoleMasterStore';
import { LinearProgress } from '@material-ui/core';
import TableButton from '../../app/common/form/TableButton';
import MaterialTable from 'material-table';
 
const AppUserRoleMasterList: React.FC = () => {

  const AppUserRoleMasterStore = useContext(AppUserRoleMasterContext);     
  
    useEffect(() => {       
      AppUserRoleMasterStore.getList();                  
    }, [AppUserRoleMasterStore, AppUserRoleMasterStore.getList])     
    
    const TableColumns = [
      {
        title: "Title",
        field: "Name",                 
        render :  (values: any) => { return <NavLink to={"/AppUserRoleMasterItemEdit/" + values.Id } >{values.Name}</NavLink> } 
      }
  ];

  const TableActions = [
      {          
        icon: (values: any) => { return <TableButton path="AppUserRoleMasterItemEdit/" label="Add New"  /> },
        tooltip: 'Add User',
        isFreeAction: true,
        onClick: (event:any) =>{},   
        iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
      },
      {          
          icon: (values: any) => { return <TableButton label="Refresh"  /> },
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event:any) =>{ AppUserRoleMasterStore.getList();},   
          iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
      }
    ]; 


    if(AppUserRoleMasterStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }
 
    return (
      <div className={"tabcontainers2"} >        
        <MaterialTable                       
            title="User Groups"
            data={AppUserRoleMasterStore.itemList}
            columns={TableColumns}
            options={{ search: true, paging: true, filtering: true, pageSize:10,  tableLayout: "auto"
                // , exportButton: false ,  actionsColumnIndex: -1, toolbarButtonAlignment:"left",                            
            }}   
            actions={TableActions}         
        />
      </div>                  
    );
};

export default observer(AppUserRoleMasterList);
