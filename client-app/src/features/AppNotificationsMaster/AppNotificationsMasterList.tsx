import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppNotificationsMasterContext } from './AppNotificationsMasterStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
 
const AppNotificationsMasterList: React.FC = () => {

  const AppNotificationsMasterStore = useContext(AppNotificationsMasterContext);     
  
    useEffect(() => {       
      AppNotificationsMasterStore.getList();                  
    }, [AppNotificationsMasterStore, AppNotificationsMasterStore.getList])       

    if(AppNotificationsMasterStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppNotificationsMasterItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppNotificationsMasterStore.getList(); }}>Refresh</Button>          
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
                {AppNotificationsMasterStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/AppNotificationsMasterItemEdit/" + row.Id } >{row.Id}</NavLink> 
                    </TableCell>
                                             
                    <TableCell align="right">{row.Subject}</TableCell>  
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { AppNotificationsMasterStore.deleteItem(row.Id).then( () => {   AppNotificationsMasterStore.getList(); })}}  />
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

export default observer(AppNotificationsMasterList);
