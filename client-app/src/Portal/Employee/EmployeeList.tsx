import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LinearProgress } from '@material-ui/core';
import MaterialTable from 'material-table';
import moment from 'moment';

import { ActionConfig, ApiContext, AppUserRoleMaster, IAppStatusList } from '../Api/Api';
import TableButton from '../../app/common/form/TableButton';
import ErrorMessage from '../../app/common/common/ErrorMessage';
import { Employee } from './Employee';

const EmployeeList: React.FC = () => {
    
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Employee[]>();
  const [stausList, setStausList] = useState<IAppStatusList[]>();
  const [roleList, setRoleList] = useState<AppUserRoleMaster[]>();
  const [error, setError] = useState('');

  const ApiStore = useContext(ApiContext);
      
  useEffect(() => {    
    setLoading(true); 

    ApiStore.getRoleList().then( res => {
        setRoleList(res);
    })
     
    ApiStore.getStatusList("ActionConfig.EmployeeTableID").then( res => {
        setStausList(res);
    })

    ApiStore.LoadDataList("ActionConfig.EmployeeList", setData, setLoading, setError );

    
  },[ApiStore, ApiStore.LoadDataList]);

  const TableColumns = [     
    {title: "Id", field: "TableItemId", defaultSort: "asc"},
    { title: "Name", field: "Name",
      render :  (values: any) => { return <Link to={`/EmployeeEdit/${values.Id}`} >{values.Name}</Link> }  },   
    { title: "StatusId", field: "StatusId",
      render : (values: any) => {  return stausList &&  (stausList as IAppStatusList[]).find( u => u.Id === Number(values.StatusId) )?.Title }
    },  
    {title: "IsActive", field: "IsActive"},
    {title: "DOB", field: "DOB",
      render : (values: any) => { return moment(values.DOB).format("DD-MMM-YYYY")  }  },
    {title: "Country", field: "Country"},
    {title: "Manager", field: "Manager"}        
  ];

  const TableActions = [
    {          
        icon: (values: any) => { return <TableButton  label="Add New" path="/EmployeeEdit" /> },
        tooltip: 'Add New',
        isFreeAction: true, 
        onClick: (event:any) =>{  },                                     
    },
    {          
        icon: (values: any) => { return <TableButton  label="Refresh"  /> },
        tooltip: 'Refresh',
        isFreeAction: true, 
        onClick: (event:any) =>{  ApiStore.LoadDataList("ActionConfig.NavigationList", setData, setLoading, setError ); },                                     
    }
  ];

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" />     
  }

      return (
        <React.Fragment>       
        <ErrorMessage message={error} />                           
        { data &&          
            <MaterialTable                    
              title="Navigation List"
              data={data as Employee[]}
              columns={TableColumns as any}
              actions={TableActions as any}
              options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10,  tableLayout: "auto"}}/>
        }       
        </React.Fragment>
    )
}

export default observer(EmployeeList);