import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { AppApiContext } from '../AppApi/AppApiStore';
import { AppApiAction } from '../AppApi/AppApi';
import { NavLink } from 'react-router-dom';
import { IEmployee } from './Employee';
import MaterialTable from 'material-table';
import { green } from '@material-ui/core/colors';
import TableButton from '../../app/common/form/TableButton';

const EmployeeList: React.FC = () => {
    
    const AppApiStore = useContext(AppApiContext);
    const [loading, setLoading] = useState(true);
      
    useEffect(() => {    
        //debugger        
        setLoading(true);        
        let act: AppApiAction = new AppApiAction()
        act.ActionId = 19;      
        AppApiStore.GetData(act).then( (res) => {                 
            setLoading(false);              
        });  
      }, [AppApiStore.ExecuteAction, AppApiStore] ) 


    const TableColumns = [
        {
          title: "Id",
          field: "Id",       
          width: "10%"
        },
        {
          title: "FirstName",
          field: "FirstName",
          render :  (values: any) => { return <NavLink to={"/EmployeeEdit/" + values.Id } >{values.FirstName}</NavLink> }
          //render : (values: IAppAction) => { return <NavLink to={"/AppNavigationItemEdit/" + values.Id } >{values.Title}</NavLink> }
          //lookup: { "Resubmit": 'Resubmit', "Approve": 'Approve', "New Request" : "New Request", "Reject" : "Reject"},
        },
    ];

    const TableActions = [
        {          
          icon:   (values: any) => { return <TableButton path="EmployeeEdit/" label="Add New"  /> },
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event:any) =>{},   
          iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%" , backgroundColor:'rosybrown' } },            
        }
      ];


    const testCSS: React.CSSProperties = {
        backgroundColor: 'green',
    }

    if(loading){
        return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

      return (
        <List>            
            <ListItem divider >
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button ><NavLink to="/EmployeeEdit/" >Add New</NavLink></Button>
                <Button  style={{backgroundColor:'green'}} onClick={ () => { AppApiStore.getList(); }}>Refresh</Button>          
                </ButtonGroup>
            </ListItem>

            <div className={"tabcontainers1"}>
                <div className={"tabcontainers2"} >        
                    <MaterialTable                       
                        title="List"
                        data={AppApiStore.dateResult.Result1}
                        columns={TableColumns}
                        options={{ search: true, paging: true, filtering: true, exportButton: true, pageSize:100,  tableLayout: "auto"
                            // ,  actionsColumnIndex: -1, toolbarButtonAlignment:"left", 
                           
                        }}   
                        actions={TableActions}         
                    />
                </div>
            </div>

        </List>
    )
}

export default observer(EmployeeList);