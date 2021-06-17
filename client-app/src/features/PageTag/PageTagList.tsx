import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PageTagContext } from './PageTagStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
 
const PageTagList: React.FC = () => {

  const PageTagStore = useContext(PageTagContext);     
  
    useEffect(() => {       
      PageTagStore.getList();                  
    }, [PageTagStore, PageTagStore.getList])       

    if(PageTagStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        {/* <ListItem divider>
        PageTagStore.itemList : {PageTagStore.itemList.length}
        </ListItem>
        <ListItem divider>
        <div>Tags : { PageTagStore.itemList.length > 0 && <div> {PageTagStore.itemList.map((row) => ( <div>{ row.Id }</div>) )} </div>} </div>
        </ListItem> */}
        <ListItem divider>

        

        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/PageTagItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { PageTagStore.getList(); }}>Refresh</Button>          
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
                {PageTagStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/PageTagItemEdit/" + row.Id } >{row.Id}</NavLink> 
                    </TableCell>
                                             
                    <TableCell align="right">{row.label}</TableCell>  
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { PageTagStore.deleteItem(row.Id).then( () => {   PageTagStore.getList(); })}}  />
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

export default observer(PageTagList);
