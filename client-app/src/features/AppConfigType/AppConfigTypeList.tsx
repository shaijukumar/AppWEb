import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppConfigTypeContext } from './AppConfigTypeStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
 
const AppConfigTypeList: React.FC = () => {

  const AppConfigTypeStore = useContext(AppConfigTypeContext);     
  
    useEffect(() => {       
      AppConfigTypeStore.getList();                  
    }, [AppConfigTypeStore, AppConfigTypeStore.getList])       

    if(AppConfigTypeStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppConfigTypeItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppConfigTypeStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AppConfigTypeStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/AppConfigTypeItemEdit/" + row.Id } >{row.Title}</NavLink> 
                    </TableCell>
                                             
                    {/* <TableCell align="right">{row.Title}</TableCell>   */}
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { AppConfigTypeStore.deleteItem(row.Id).then( () => {   AppConfigTypeStore.getList(); })}}  />
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

export default observer(AppConfigTypeList);
