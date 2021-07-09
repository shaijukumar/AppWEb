import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import { UserManagerContext } from './UserManagerStore';

 
const UserList: React.FC = () => {

     const UserManagerStore = useContext(UserManagerContext);  
     

    useEffect(() => {       
        UserManagerStore.getList();                  
      }, [UserManagerStore, UserManagerStore.getList])     

    if( UserManagerStore.loading ){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
     
      <List>  
        <ListItem divider>
          <h3>User List</h3>  
        </ListItem>
          
          
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/useredit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { UserManagerStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>

        
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>                  
                  <TableCell align="left">DisplayName</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">PhoneNumber</TableCell>
                  <TableCell align="left">Is Active</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {UserManagerStore.itemList.map((row) => (
                  <TableRow key={row.Username} >
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/useredit/" + row.Username } >{row.DisplayName}</NavLink> 
                    </TableCell>
                    <TableCell align="left">{row.Username}</TableCell>                                               
                    <TableCell align="left">{row.Email}</TableCell>  
                    <TableCell align="left">{row.PhoneNumber}</TableCell>
                    <TableCell align="left" >{row.IsActive ? "Acrive" : "Inactive" }</TableCell>            
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>

      </List>        
     
    );
};


export default observer(UserList);
