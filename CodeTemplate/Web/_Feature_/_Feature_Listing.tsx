import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { _Feature_Context } from './_Feature_Store';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MaterialTable from 'material-table';
import { _Feature_ } from './_Feature_';

const _Feature_List: React.FC = () => {

  const _Feature_Store = useContext(_Feature_Context);     
  
    useEffect(() => {       
      _Feature_Store.getList();                  
    }, [_Feature_Store, _Feature_Store.getList])   
    
    
    const TableColumns = [
      {
        title: "Id",
        field: "Id",
      },
      {
        title: "Action",
        field: "Action",
        //render : (values: I_Feature_) => { return <NavLink to={"/_Feature_ItemEdit/" + values.Id } >{values.Action}</NavLink> }
        //render : (values: IAppAction) => { return <NavLink to={"/AppNavigationItemEdit/" + values.Id } >{values.Title}</NavLink> }
        //lookup: { "Resubmit": 'Resubmit', "Approve": 'Approve', "New Request" : "New Request", "Reject" : "Reject"},
      },      
    ];

    if(_Feature_Store.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }
 
    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/_Feature_ItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { _Feature_Store.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>

        <div className={"tabcontainers1"}>
          <div className={"tabcontainers2"} >        
            <MaterialTable                       
              title="Left Navigation List"
              data={_Feature_Store.itemList}
              columns={TableColumns}
              options={{ search: true, paging: true, filtering: true, exportButton: true, pageSize:100 }}            
            />
          </div>
        </div>
         
        {/* <ListItem divider>
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
                {_Feature_Store.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/_Feature_ItemEdit/" + row.Id } >{row.Id}</NavLink> 
                    </TableCell>
                                             
                    <TableCell align="right">{row.Title}</TableCell>  
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { _Feature_Store.deleteItem(row.Id).then( () => {   _Feature_Store.getList(); })}}  />
                    </TableCell>            
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem> */}

      </List>        
     
    );
};

export default observer(_Feature_List);