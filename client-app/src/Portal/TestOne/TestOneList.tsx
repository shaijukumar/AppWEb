import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { LinearProgress  } from '@material-ui/core';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';

import { ActionConfig, ApiContext } from '../Api/Api';
import TableButton from '../../app/common/form/TableButton';
import ErrorMessage from '../../app/common/common/ErrorMessage';
import { TestOne } from './TestOne';

const TestOneList: React.FC = () => {
    
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TestOne[]>();
  const [error, setError] = useState('');

  const ApiStore = useContext(ApiContext);
      
  useEffect(() => {    
    setLoading(true); 
    ApiStore.LoadDataList(15, setData, setLoading, setError );    
  },[ApiStore, ApiStore.LoadDataList]);

  const TableColumns = [     
    // {title: "Id", field: "TableItemId", defaultSort: "asc"},
    // {title: "Name", field: "Name", render :  (values: any) => { return <Link to={`/TestOne/${values.Id}`} >{values.Name}</Link> }  },   
    // {title: "StatusId", field: "StatusId", render : (values: any) => {  return stausList &&  (stausList as IAppStatusList[]).find( u => u.Id === Number(values.StatusId) )?.Title }     },  
    // {title: "IsActive", field: "IsActive"},
    // {title: "DOB", field: "DOB", render : (values: any) => { return moment(values.DOB).format("DD-MMM-YYYY")  }  },
    // {title: "Country", field: "Country"},
    // {title: "Manager", field: "Manager"} 
    
		{title: 'Title', field: 'Title', render :  (values: any) => { return <Link to={`/TestOneEdit/${values.Id}`} >{values.Title}</Link> } }, 
		{title: 'Order', field: 'Order'}, 
		{title: 'IsActive', field: 'IsActive'}, 
		{title: 'DOB', field: 'DOB'}, 
		{title: 'Document', field: 'Document'}, 
		{title: 'Country', field: 'Country'}, 
		{title: 'Salary', field: 'Salary'},        
  ];

  const TableActions = [
    {          
        icon: (values: any) => { return <TableButton  label="Add New" path="/TestOneEdit" /> },
        tooltip: 'Add New',
        isFreeAction: true, 
        onClick: (event:any) =>{  },                                     
    },
    {          
        icon: (values: any) => { return <TableButton  label="Refresh"  /> },
        tooltip: 'Refresh',
        isFreeAction: true, 
        onClick: (event:any) =>{  ApiStore.LoadDataList(ActionConfig.NavigationList, setData, setLoading, setError ); },                                     
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
              title="TestOne List"
              data={data as TestOne[]}
              columns={TableColumns as any}
              actions={TableActions as any}
              options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10,  tableLayout: "auto"}}/>
        }       
        </React.Fragment>
    )
}

export default observer(TestOneList);
