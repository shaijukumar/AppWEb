import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppUserRoleMasterContext } from './AppUserRoleMasterStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import TableButton from '../../app/common/form/TableButton';
import MaterialTable from 'material-table';
 
const AppUserRoleMasterList: React.FC = () => {

  const AppUserRoleMasterStore = useContext(AppUserRoleMasterContext);     
  
    useEffect(() => {       
      AppUserRoleMasterStore.getList();                  
    }, [AppUserRoleMasterStore, AppUserRoleMasterStore.getList])     
    
    const TableColumns = [
      // {
      //   title: "Id",
      //   field: "Id",
                
      // },
      {
        title: "Title",
        field: "Name",                 
        render :  (values: any) => { return <NavLink to={"/AppUserRoleMasterItemEdit/" + values.Id } >{values.Name}</NavLink> } 
      }
  ];

  const TableActions = [
      {          
        icon: (values: any) => { return <TableButton path="AppUserRoleMasterItemEdit/" label="Add New"  /> },
        tooltip: 'Add User',
        isFreeAction: true,
        onClick: (event:any) =>{},   
        iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
      },
      {          
          icon: (values: any) => { return <TableButton label="Refresh"  /> },
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event:any) =>{ AppUserRoleMasterStore.getList();},   
          iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
      }
    ]; 


    if(AppUserRoleMasterStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }
 
    return (
      <div className={"tabcontainers2"} >        
        <MaterialTable                       
            title="User List"
            data={AppUserRoleMasterStore.itemList}
            columns={TableColumns}
            options={{ search: true, paging: true, filtering: true, pageSize:10,  tableLayout: "auto"
                // , exportButton: false ,  actionsColumnIndex: -1, toolbarButtonAlignment:"left",                            
            }}   
            actions={TableActions}         
        />
      </div>

      // <List>

      //   <ListItem divider>
      //     <h3>User Role Master</h3>  
      //   </ListItem>

      //   <ListItem divider>
      //   <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
      //     <Button >
      //       <NavLink to="/AppUserRoleMasterItemEdit/" >Add New</NavLink> 
      //     </Button>
      //     <Button onClick={ () => { AppUserRoleMasterStore.getList(); }}>Refresh</Button>          
      //   </ButtonGroup>
      //   </ListItem>
        
      //   <ListItem divider>
      //     <TableContainer component={Paper}>
      //       <Table aria-label="simple table">
      //         <TableHead>
      //           <TableRow>
      //             <TableCell>Id</TableCell>
      //             <TableCell align="left">Title</TableCell>
      //             <TableCell align="right">Delete</TableCell>
      //           </TableRow>
      //         </TableHead>
      //         <TableBody>
      //           {AppUserRoleMasterStore.itemList.map((row) => (
      //             <TableRow key={row.Id} >
      //               <TableCell align="left"  >{row.Id}</TableCell>
      //               <TableCell component="th" scope="row"  >
      //                 <NavLink to={"/AppUserRoleMasterItemEdit/" + row.Id } >{row.Title}</NavLink> 
      //               </TableCell>
                                             
      //               {/* <TableCell align="right">{row.Title}</TableCell>   */}
      //               <TableCell align="right" >
      //                 <DeleteOutlinedIcon onClick={ () => { AppUserRoleMasterStore.deleteItem(row.Id).then( () => {   AppUserRoleMasterStore.getList(); })}}  />
      //               </TableCell>            
      //             </TableRow>
      //           ))}
      //         </TableBody>
      //       </Table>
      //     </TableContainer>
      //   </ListItem>

      // </List>        
     
    );
};

export default observer(AppUserRoleMasterList);
