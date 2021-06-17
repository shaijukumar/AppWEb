import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppTableMasterContext } from './AppTableMasterStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
 
const AppTableMasterList: React.FC = () => {

    const AppTableMasterStore = useContext(AppTableMasterContext);    
  
    useEffect(() => {       
      AppTableMasterStore.getList();                  
    }, [AppTableMasterStore, AppTableMasterStore.getList])       

    if(AppTableMasterStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>        
        <ListItem divider>
          <h3>Table List</h3>  
        </ListItem>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppTableMasterItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppTableMasterStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AppTableMasterStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell component="th" scope="row"  align="left">
                      <NavLink to={"/AppTableMasterItemEdit/" + row.Id } >{row.Title}</NavLink> 
                    </TableCell>
                                             
                    {/* <TableCell align="right">{row.Title}</TableCell>   */}
                    <TableCell align="left" >
                      <DeleteOutlinedIcon onClick={ () => { AppTableMasterStore.deleteItem(row.Id).then( () => {   AppTableMasterStore.getList(); })}}  />
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

export default observer(AppTableMasterList);
