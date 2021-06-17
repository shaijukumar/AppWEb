import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppUserRoleMasterContext } from './AppUserRoleMasterStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
 
const AppUserRoleMasterList: React.FC = () => {

  const AppUserRoleMasterStore = useContext(AppUserRoleMasterContext);     
  
    useEffect(() => {       
      AppUserRoleMasterStore.getList();                  
    }, [AppUserRoleMasterStore, AppUserRoleMasterStore.getList])       

    if(AppUserRoleMasterStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>

        <ListItem divider>
          <h3>User Role Master</h3>  
        </ListItem>

        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppUserRoleMasterItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppUserRoleMasterStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AppUserRoleMasterStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell align="left"  >{row.Id}</TableCell>
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/AppUserRoleMasterItemEdit/" + row.Id } >{row.Title}</NavLink> 
                    </TableCell>
                                             
                    {/* <TableCell align="right">{row.Title}</TableCell>   */}
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { AppUserRoleMasterStore.deleteItem(row.Id).then( () => {   AppUserRoleMasterStore.getList(); })}}  />
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

export default observer(AppUserRoleMasterList);
