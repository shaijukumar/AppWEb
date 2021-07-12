import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppUserRoleContext } from './AppUserRoleStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { AppUserRoleMasterContext } from '../AppUserRoleMaster/AppUserRoleMasterStore';
 
const AppUserRoleList: React.FC = () => {

  const AppUserRoleStore = useContext(AppUserRoleContext);
  const AppUserRoleMasterStore = useContext(AppUserRoleMasterContext);
  
    useEffect(() => {       
      AppUserRoleMasterStore.getList();
      AppUserRoleStore.getList();                  
    }, [AppUserRoleStore, AppUserRoleStore.getList, AppUserRoleMasterStore])       

    if(AppUserRoleStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
          <h3>User Roles</h3>  
        </ListItem>

        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppUserRoleItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppUserRoleStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">User Id</TableCell>
                  <TableCell align="right">User Role</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AppUserRoleStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/AppUserRoleItemEdit/" + row.Id } >{row.Id}</NavLink> 
                    </TableCell>
                                             
                    <TableCell align="right">{row.UserId}</TableCell>
                    {/* <TableCell align="right">{ AppUserRoleMasterStore.itemList.find( u => u.Id === row.AppUserRoleMasterId )?.Title }</TableCell>   */}
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { AppUserRoleStore.deleteItem(row.Id).then( () => {   AppUserRoleStore.getList(); })}}  />
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

export default observer(AppUserRoleList);
