import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppNitificationTemplateContext } from './AppNitificationTemplateStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MaterialTable from 'material-table';
import { AppNitificationTemplate } from './AppNitificationTemplate';


const AppNitificationTemplateList: React.FC = () => {

  const AppNitificationTemplateStore = useContext(AppNitificationTemplateContext);     
  
    useEffect(() => {       
      AppNitificationTemplateStore.getList();                  
    }, [AppNitificationTemplateStore, AppNitificationTemplateStore.getList])   
    
    
    const TableColumns = [
      {
        title: "Id",
        field: "Id",
      },
      {
        title: "Template Name",
        field: "Action",
        render : (values: AppNitificationTemplate) => { return <NavLink to={"/AppNitificationTemplateItemEdit/" + values.Id } >{values.Title}</NavLink> }
        //render : (values: IAppAction) => { return <NavLink to={"/AppNavigationItemEdit/" + values.Id } >{values.Title}</NavLink> }
        //lookup: { "Resubmit": 'Resubmit', "Approve": 'Approve', "New Request" : "New Request", "Reject" : "Reject"},
      },   
      {
        title: "Description",
        field: "Description",
      },   
    ];

    if(AppNitificationTemplateStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }
 
    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppNitificationTemplateItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppNitificationTemplateStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>

        <div className={"tabcontainers1"}>
          <div className={"tabcontainers2"} >        
            <MaterialTable                       
              title="Left Navigation List"
              data={AppNitificationTemplateStore.itemList}
              columns={TableColumns}
              options={{ search: true, paging: true, filtering: true, exportButton: true, pageSize:100 }}            
            />
          </div>
        </div>         
       </List>        
     
    );
};

export default observer(AppNitificationTemplateList);
