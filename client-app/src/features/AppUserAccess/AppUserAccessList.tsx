import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppUserAccessContext } from './AppUserAccessStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
 
const AppUserAccessList: React.FC = () => {

  const AppUserAccessStore = useContext(AppUserAccessContext);     
  
    useEffect(() => {       
      AppUserAccessStore.getList();                  
    }, [AppUserAccessStore, AppUserAccessStore.getList])       

    if(AppUserAccessStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppUserAccessItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppUserAccessStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Description</TableCell>                  
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AppUserAccessStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/AppUserAccessItemEdit/" + row.Id } >{row.Id}</NavLink> 
                    </TableCell>
                                             
                    <TableCell align="right">{row.Title}</TableCell> 
                    <TableCell align="right">{row.Description}</TableCell>                    
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { AppUserAccessStore.deleteItem(row.Id).then( () => {   AppUserAccessStore.getList(); })}}  />
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

export default observer(AppUserAccessList);
