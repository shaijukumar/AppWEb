import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppConfigContext } from './AppConfigStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { AppConfigTypeContext } from '../AppConfigType/AppConfigTypeStore';
import { AppConfig } from './AppConfig';
 

type CustomProps = {  initVal : AppConfig, parentRefresh : any } ;

const ConfigType: React.FC<CustomProps> = ({initVal, parentRefresh}) => {  

  const AppConfigTypeStore = useContext(AppConfigTypeContext);
  const AppConfigStore = useContext(AppConfigContext);  

  
    useEffect(() => {       
      AppConfigTypeStore.getList();
                             
    }, [AppConfigStore, AppConfigStore.getConfigList, AppConfigTypeStore.getList])       

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
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Order</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Type</TableCell>                  
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AppConfigStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell align="left">{ row.Order }</TableCell>
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/AppConfigItemEdit/" + row.Id } >{row.Title}</NavLink> 
                    </TableCell>
                                             
                    <TableCell align="left">{ AppConfigTypeStore.itemList.find( u => u.Id == row.ConfigTypeId )?.Title }</TableCell>  
                    <TableCell align="left" >
                      <DeleteOutlinedIcon onClick={ () => { AppConfigStore.deleteItem(row.Id).then( () => {   AppConfigStore.getList(); })}}  />
                    </TableCell>            
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>
      </List>             
    );
};

export default observer(ConfigType);
