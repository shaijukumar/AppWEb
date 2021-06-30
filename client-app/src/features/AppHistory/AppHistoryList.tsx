import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppHistoryContext } from './AppHistoryStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MaterialTable from 'material-table';
import {TablePagination} from "@material-ui/core";

import 'material-design-icons/iconfont/material-icons.css'
import { AppStatusListContext } from '../AppStatusList/AppStatusListStore';

const AppHistoryList: React.FC = () => {

 
  const AppHistoryStore = useContext(AppHistoryContext);  
  const AppStatusListStore = useContext(AppStatusListContext);   
  
    useEffect(() => {       
      AppStatusListStore.getList();
      AppHistoryStore.getList(); 

      console.log(React.version);         
    }, [AppHistoryStore, AppHistoryStore.getList])       

    if(AppHistoryStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

   

    

    const containers  = {
      width:'100%',
      height: '100%',
      backgroundColor: '#282c34'
    };

    const containers1  = {      
      backgroundColor: '#282c34'
    }

    const rend = (values: any) => { 

      return AppStatusListStore.itemList.find( u => u.Id ==values.FromStage )?.Title ;
    };


    const histColumns = [
      {
        title: "Id",
        field: "Id",
      },
      {
        title: "Action",
        field: "Action",
        lookup: { "Resubmit": 'Resubmit', "Approve": 'Approve', "New Request" : "New Request", "Reject" : "Reject"},
      },
      {
        title: "FromStage",
        field: "FromStage",
        render : rend
        //render: rowData => <img src={rowData.url} style={{width: 50, borderRadius: '50%'}}/>
        //render: {(rowData as any) => (<div> rowData.ToStatusId </div>)}
        // lookup: { "Resubmit": 'Resubmit', "Approve": 'Approve', "New Request" : "New Request", "Reject" : "Reject"},
      },
      
    ];


    return (
      // <List>
      //   <ListItem divider>
      //   <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
      //     <Button >
      //       <NavLink to="/AppHistoryItemEdit/" >Add New</NavLink> 
      //     </Button>
      //     <Button onClick={ () => { AppHistoryStore.getList(); }}>Refresh</Button>          
      //   </ButtonGroup>
      //   </ListItem>
        
      //   <ListItem divider>
      //     <TableContainer component={Paper}>
      //       <Table aria-label="simple table">
      //         <TableHead>
      //           <TableRow>
      //             <TableCell>ID</TableCell>
      //             <TableCell align="right">Action</TableCell>
      //             <TableCell align="right">Delete</TableCell>
      //           </TableRow>
      //         </TableHead>
      //         <TableBody>
      //           {AppHistoryStore.itemList.map((row) => (
      //             <TableRow key={row.Id} >
      //               <TableCell component="th" scope="row"  >
      //                 <NavLink to={"/AppHistoryItemEdit/" + row.Id } >{row.Id}</NavLink> 
      //               </TableCell>
                                             
      //               <TableCell align="right">{row.Action}</TableCell>  
      //               <TableCell align="right" >
      //                 <DeleteOutlinedIcon onClick={ () => { AppHistoryStore.deleteItem(row.Id).then( () => {   AppHistoryStore.getList(); })}}  />
      //               </TableCell>            
      //             </TableRow>
      //           ))}
      //         </TableBody>
      //       </Table>
      //     </TableContainer>
      //   </ListItem>

      // </List>     
      <div className={"tabcontainers1"}>
        <div className={"tabcontainers2"} >        
          <MaterialTable                       
            title="App History"
            data={AppHistoryStore.itemList}
            columns={histColumns}
            options={{ search: true, paging: true, filtering: true, exportButton: true, pageSize:10 }}            
          />
        </div>
      </div>
     
    );
};

export default observer(AppHistoryList);
