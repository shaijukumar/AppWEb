import React, { useContext, useEffect, useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';

import { AppApiAction } from '../../features/AppApi/AppApi';
import { NavLink } from 'react-router-dom';
import MaterialTable from 'material-table';
import TableButton from '../../app/common/form/TableButton';

const EmployeeList: React.FC = () => {
    
    //const AppApiStore = useContext(AppApiContext);
    const [loading, setLoading] = useState(true);
    const QueryActionId = 19;
      
    useEffect(() => {    
        //debugger        
        // setLoading(true);        
        // let act: AppApiAction = new AppApiAction()
        // act.ActionId = QueryActionId;      
        // AppApiStore.GetData(act).then( (res) => {                 
        //     setLoading(false);              
        // });  
      }, [] ) 


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
          icon: (values: any) => { return <TableButton path="EmployeeEdit/" label="Add New"  /> },
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event:any) =>{},   
          iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
        },
        {          
            icon: (values: any) => { return <TableButton label="Refresh"  /> },
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event:any) =>{},   
            iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
          }
      ];
  

    if(loading){
        return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

      return (
        <div className={"tabcontainers1"}>
            {/* <head>
                <link rel="stylesheet" href="styles.css" ></link>
            </head> */}
            <link rel="stylesheet" href="styles.css" ></link>

            <div className={"tabcontainers2"} >        
                {/* <MaterialTable                       
                    title="List"
                    data={AppApiStore.dateResult.Result1}
                    columns={TableColumns}
                    options={{ search: true, paging: true, filtering: true, pageSize:10,  tableLayout: "auto"
                        // , exportButton: false ,  actionsColumnIndex: -1, toolbarButtonAlignment:"left",                            
                    }}   
                    actions={TableActions}         
                /> */}
            </div>
        </div>
    )
}

export default observer(EmployeeList);