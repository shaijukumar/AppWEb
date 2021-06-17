import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppFlowContext } from './AppFlowStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
 
const AppFlowList: React.FC = () => {

  const AppFlowStore = useContext(AppFlowContext);     
  
    useEffect(() => {       
      AppFlowStore.getList();                  
    }, [AppFlowStore, AppFlowStore.getList])       

    if(AppFlowStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppFlowItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppFlowStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AppFlowStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/AppFlowItemEdit/" + row.Id } >{row.Title}</NavLink> 
                    </TableCell>
                                             
                    {/* <TableCell align="right">{row.Title}</TableCell>   */}
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { AppFlowStore.deleteItem(row.Id).then( () => {   AppFlowStore.getList(); })}}  />
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

export default observer(AppFlowList);
