import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LinearProgress } from '@material-ui/core';

import { UserManagerContext } from './UserManagerStore';
import TableButton from '../../app/common/form/TableButton';
import MaterialTable from 'material-table';

 
const UserList: React.FC = () => {

     const UserManagerStore = useContext(UserManagerContext);  
     

    useEffect(() => {       
        UserManagerStore.getList();                  
      }, [UserManagerStore, UserManagerStore.getList])  
      
    const TableColumns = [
        {
          title: "Display Name",
          field: "DisplayName",                 
          render :  (values: any) => { return <NavLink to={"/useredit/" + values.Username } >{values.DisplayName}</NavLink> } 
        },
        {
          title: "Username",
          field: "Username",
                  
        },
        {
          title: "Email",
          field: "Email",
                  
        },
        {
          title: "PhoneNumber",
          field: "PhoneNumber",
                  
        },
        {
          title: "Is Active",
          field: "IsActive",   
          render : (values: any) => { return values.IsActive ? "Active" : "Inactive" },
          lookup: { true : "Active", false : "Inactive" },            
        }
    ];

    const TableActions = [
        {          
          icon: (values: any) => { return <TableButton path="useredit/" label="Add New"  /> },
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event:any) =>{},   
          iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
        },
        {          
            icon: (values: any) => { return <TableButton label="Refresh"  /> },
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event:any) =>{ UserManagerStore.getList();},   
            iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
          }
      ];      

    if( UserManagerStore.loading ){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (

      <div className={"tabcontainers1"}>

        <link rel="stylesheet" href="styles.css" ></link>

        <div className={"tabcontainers2"} >        
            <MaterialTable                       
                title="User List"
                data={UserManagerStore.itemList}
                columns={TableColumns}
                options={{ search: true, paging: true, filtering: true, pageSize:10,  tableLayout: "auto"
                    // , exportButton: false ,  actionsColumnIndex: -1, toolbarButtonAlignment:"left",                            
                }}   
                actions={TableActions}         
            />
        </div>
      </div>
     
      // <List>  
      //   <ListItem divider>
      //     <h3>User List</h3>  
      //   </ListItem>
          
          
      //   <ListItem divider>
      //   <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
      //     <Button >
      //       <NavLink to="/useredit/" >Add New</NavLink> 
      //     </Button>
      //     <Button onClick={ () => { UserManagerStore.getList(); }}>Refresh</Button>          
      //   </ButtonGroup>
      //   </ListItem>

        
        
      //   <ListItem divider>
      //     <TableContainer component={Paper}>
      //       <Table aria-label="simple table">
      //         <TableHead>
      //           <TableRow>                  
      //             <TableCell align="left">DisplayName</TableCell>
      //             <TableCell align="left">Username</TableCell>
      //             <TableCell align="left">Email</TableCell>
      //             <TableCell align="left">PhoneNumber</TableCell>
      //             <TableCell align="left">Is Active</TableCell>
      //           </TableRow>
      //         </TableHead>
      //         <TableBody>
      //           {UserManagerStore.itemList.map((row) => (
      //             <TableRow key={row.Username} >
      //               <TableCell component="th" scope="row"  >
      //                 <NavLink to={"/useredit/" + row.Username } >{row.DisplayName}</NavLink> 
      //               </TableCell>
      //               <TableCell align="left">{row.Username}</TableCell>                                               
      //               <TableCell align="left">{row.Email}</TableCell>  
      //               <TableCell align="left">{row.PhoneNumber}</TableCell>
      //               <TableCell align="left" >{row.IsActive ? "Acrive" : "Inactive" }</TableCell>            
      //             </TableRow>
      //           ))}
      //         </TableBody>
      //       </Table>
      //     </TableContainer>
      //   </ListItem>

      // </List>        
     
    );
};


export default observer(UserList);
