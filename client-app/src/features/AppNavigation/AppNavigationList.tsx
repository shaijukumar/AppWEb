import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppNavigationContext } from './AppNavigationStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem } from '@material-ui/core';

import MaterialTable from 'material-table';
import { IAppNavigation } from './AppNavigation';
import { AppUserRoleMasterContext } from '../AppUserRoleMaster/AppUserRoleMasterStore';
 
const AppNavigationList: React.FC = () => {

  const AppNavigationStore = useContext(AppNavigationContext);  
  const AppUserRoleMasterStore = useContext(AppUserRoleMasterContext);     
  
    useEffect(() => {       
      AppUserRoleMasterStore.getList();  
      AppNavigationStore.setSelected('/AppNavigationlist');
      AppNavigationStore.getList();                  
    }, [AppUserRoleMasterStore, AppUserRoleMasterStore.getList, AppNavigationStore, AppNavigationStore.getList, AppNavigationStore.setSelected])       

    if(AppNavigationStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }
 
    const TableColumns = [
      {
        title: "Id",
        field: "Id",
      },
      {
        title: "Title",
        field: "Title",
        render : (values: IAppNavigation) => { return <NavLink to={"/AppNavigationItemEdit/" + values.Id } >{values.Title}</NavLink> }
        //lookup: { "Resubmit": 'Resubmit', "Approve": 'Approve', "New Request" : "New Request", "Reject" : "Reject"},
      },
      {
        title: "Path",
        field: "Path",
        //render : rend
        //render : (values: IAppHistory) => { return AppStatusListStore.itemList.find( u => u.Id ==values.FromStage )?.Title }
      },     
      {
        title: "Icon",
        field: "Icon",
        //render : rend
        //render : (values: IAppHistory) => { return AppStatusListStore.itemList.find( u => u.Id ==values.FromStage )?.Title }
      }, 
      {
        title: "RoleId",
        field: "RoleId",   
        render : (values: any) => { return AppUserRoleMasterStore.itemList.find( u => u.Id === values.RoleId )?.Name }
      },
    ];


    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppNavigationItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppNavigationStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <div className={"tabcontainers1"}>
          <div className={"tabcontainers2"} >        
            <MaterialTable                       
              title="Left Navigation List"
              data={AppNavigationStore.itemList}
              columns={TableColumns}
              options={{ search: true, paging: true, filtering: true, exportButton: true, pageSize:100 }}            
            />
          </div>
        </div>   

      </List>        
     
    );
};

export default observer(AppNavigationList);
