import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppConfigContext } from './AppConfigStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { AppConfigTypeContext } from '../AppConfigType/AppConfigTypeStore';
import { IAppConfig } from './AppConfig';
import MaterialTable from 'material-table';
import { IAppConfigType } from '../AppConfigType/AppConfigType';
 
const AppConfigList: React.FC = () => {

  const AppConfigTypeStore = useContext(AppConfigTypeContext);
  const AppConfigStore = useContext(AppConfigContext);  
  const [types, setTypes] = useState<string[]>([]); 

  const TableColumns = [
    {
      title: "Order",
      field: "Order",          
      defaultSort: "asc",
      filtering: false,
    },
    {
      title: "Title",
      field: "Title",
      render : (values: IAppConfig) => { return <NavLink to={"/AppConfigItemEdit/" + values.Id } >{values.Title}</NavLink> },
    },
    {
      title: "Type",
      field: "ConfigTypeId", 
      render : (values: IAppConfig) => { return AppConfigTypeStore.itemList.find( u => u.Id === values.ConfigTypeId )?.Title },
      lookup: types, 
    },
    {
      title: "Id",
      field: "Id", 
      render : (values: IAppConfig) => { return <DeleteOutlinedIcon onClick={ () => { AppConfigStore.deleteItem(values.Id).then( () => {   AppConfigStore.getList(); })}}  /> },      
      filtering: false,
    },
  ];

   
  
    useEffect(() => {       
      
      AppConfigTypeStore.getList().then( (res : any) => {
        
        res.map( (row:IAppConfigType) => {
          types[ row.Id ] =  row.Title;                  
        });        
        setTypes(types);
      });

      AppConfigStore.getList();                        
    }, [AppConfigStore, AppConfigStore.getList, AppConfigTypeStore.getList])       

    if(AppConfigStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppConfigItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppConfigStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <div className={"tabcontainers1"}>
            <div className={"tabcontainers2"} >     
              {TableColumns.length>0     &&   
              <MaterialTable                    
                title="Application Configration"
                data={AppConfigStore.itemList}
                columns={TableColumns as any}
                options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:100,  tableLayout: "auto"}}            
              />
            }
            </div>
          </div>
        </ListItem>
      </List>             
    );
};

export default observer(AppConfigList);
