import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { SitePageContext } from './SitePageStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import TagChip from '../PageTag/TagChip';
 
const SitePageList: React.FC = () => {

  const SitePageStore = useContext(SitePageContext);     
  
    useEffect(() => {       
      SitePageStore.getList();                  
    }, [SitePageStore, SitePageStore.getList])       

    if(SitePageStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/SitePageItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { SitePageStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Tags</TableCell>
                  <TableCell align="right">URL Title</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {SitePageStore.itemList.map((row) => (
                  <TableRow key={row.Id} >

                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/SitePageItemEdit/" + row.Id } >{row.Title}</NavLink> 
                    </TableCell>
                    
                    <TableCell align="right">
                      <TagChip IdList={row.Tags}></TagChip>
                      </TableCell>                         
                    <TableCell align="right">{row.URLTitle}</TableCell>  
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { SitePageStore.deleteItem(row.Id).then( () => {   SitePageStore.getList(); })}}  />
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

export default observer(SitePageList);
