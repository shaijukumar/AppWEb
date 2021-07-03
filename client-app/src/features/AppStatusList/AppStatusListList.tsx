import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppStatusListContext } from './AppStatusListStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { AppTableMasterContext } from '../AppTableMaster/AppTableMasterStore';
 
const AppStatusListList: React.FC = () => {

  const AppStatusListStore = useContext(AppStatusListContext); 
  const AppTableMasterStore = useContext(AppTableMasterContext);    
  
    useEffect(() => {  
      AppTableMasterStore.getList();     
      AppStatusListStore.getList();                  
    }, [AppStatusListStore, AppStatusListStore.getList])       

    if(AppStatusListStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppStatusListItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppStatusListStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell align="left" width="50">Id</TableCell>
                  <TableCell align="left" width="50">Order</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Table</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AppStatusListStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell align="right">{row.Id}</TableCell>
                    <TableCell align="right">{row.Order}</TableCell>
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/AppStatusListItemEdit/" + row.Id } >{row.Title}</NavLink> 
                    </TableCell>
                    <TableCell align="left">{ AppTableMasterStore.itemList.find( u => u.Id == row.TableId )?.Title } </TableCell>
                                             
                    {/* <TableCell align="right">{row.Title}</TableCell>   */}
                    <TableCell align="left" >
                      <DeleteOutlinedIcon onClick={ () => { AppStatusListStore.deleteItem(row.Id).then( () => {   AppStatusListStore.getList(); })}}  />
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

export default observer(AppStatusListList);
