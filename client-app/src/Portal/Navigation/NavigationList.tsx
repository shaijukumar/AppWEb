import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MaterialTable from 'material-table';
import { ApiContext, AppApiAction, AppUserRoleMaster, IAppStatusList } from '../Api/Api';
import { AppNavigation } from './Navigation';
import TableButton from '../../app/common/form/TableButton';


const NavigationList: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<AppNavigation[]>();
    const [stausList, setStausList] = useState<IAppStatusList[]>();
    const [roleList, setRoleList] = useState<AppUserRoleMaster[]>();

    const ApiStore = useContext(ApiContext);
    useEffect(() => {    
        setLoading(true); 

        ApiStore.getRoleList().then( res => {
            setRoleList(res);
        })

        ApiStore.getStatusList(20).then( res => {
            setStausList(res);
        })

        let act: AppApiAction = new AppApiAction()
        act.ActionId = 34;      
        ApiStore.ExecuteQuery(act).then( (res) => {     
            setData(res.Result1); setLoading(false);              
        });

    },[ApiStore, ApiStore.ExecuteQuery]);



    const TableColumns = [     
        {title: "Order", field: "Order", defaultSort: "asc"},
        { title: "Title", field: "Title", defaultSort: "asc",
          render :  (values: any) => { return <Link to={`/NavigationEdit/${values.Id}`} >{values.Title}</Link> }  },   
        { title: "StatusId", field: "StatusId",
          render : (values: any) => {  return stausList &&  (stausList as IAppStatusList[]).find( u => u.Id === Number(values.StatusId) )?.Title }
        },  
        {title: "Path", field: "Path"},
        {title: "Icon", field: "Icon"},
        {title: "UserAccessRoles", field: "UserAccessRoles",
         render : (values: any) => {  return ApiStore.rolesName(roleList as any, values.UserAccessRoles)   }},          
    ];

    const TableActions = [
        {          
            icon: (values: any) => { return <TableButton  label="Add New" path="/NavigationEdit" /> },
            tooltip: 'Add New',
            isFreeAction: true,             
            iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
        },
        // {          
        //     icon: (values: any) => { return <TableButton label="Refresh"  /> },
        //     tooltip: 'Refresh',
        //     isFreeAction: true,
        //     onClick: (event:any) =>{ AppColumnMasterStore.getColumnList(Number(id));},   
        //     iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
        //     }
        ]; 

    if(loading){
        return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return(
        <React.Fragment>
        { data && 
        
            <MaterialTable                    
              title="Status List"
              data={data as AppNavigation[]}
              columns={TableColumns as any}
              actions={TableActions as any}
              options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10,  tableLayout: "auto"}}/>
        }
        </React.Fragment>
        
    )
}

export default observer(NavigationList);