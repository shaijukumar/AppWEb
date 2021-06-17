import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PageCategoryContext } from './PageCategoryStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PageCategoryItem from '../../app/common/common/PageCategoryItem';
 
const PageCategoryList: React.FC = () => {

  const PageCategoryStore = useContext(PageCategoryContext);     
  
    useEffect(() => {       
      PageCategoryStore.getList();                  
    }, [PageCategoryStore, PageCategoryStore.getList])       

    if(PageCategoryStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/PageCategoryItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { PageCategoryStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Parent</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {PageCategoryStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/PageCategoryItemEdit/" + row.Id } >{row.Id}</NavLink> 
                    </TableCell>
                    
                    <TableCell align="right"><PageCategoryItem CategoryId={row.Pid}  /></TableCell>

                    <TableCell align="right">{row.Title}</TableCell>  
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { PageCategoryStore.deleteItem(row.Id).then( () => {   PageCategoryStore.getList(); })}}  />
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

export default observer(PageCategoryList);
