import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppNotificationsContext } from './AppNotificationsStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
 
const AppNotificationsList: React.FC = () => {

  const AppNotificationsStore = useContext(AppNotificationsContext);     
  
    useEffect(() => {       
      AppNotificationsStore.getList();                  
    }, [AppNotificationsStore, AppNotificationsStore.getList])       

    if(AppNotificationsStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppNotificationsItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppNotificationsStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AppNotificationsStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/AppNotificationsItemEdit/" + row.Id } >{row.Id}</NavLink> 
                    </TableCell>
                                             
                    <TableCell align="right">{row.NotificationsMasterId}</TableCell>  
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { AppNotificationsStore.deleteItem(row.Id).then( () => {   AppNotificationsStore.getList(); })}}  />
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

export default observer(AppNotificationsList);
