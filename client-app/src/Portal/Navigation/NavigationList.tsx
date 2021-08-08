import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, LinearProgress } from '@material-ui/core';
import MaterialTable from 'material-table';
import XLSX from "xlsx";
import { ActionConfig, ApiContext, AppApiAction, AppUserRoleMaster, IAppStatusList } from '../Api/Api';
import { AppNavigation } from './Navigation';
import TableButton from '../../app/common/form/TableButton';
import ErrorMessage from '../../app/common/common/ErrorMessage';

const NavigationList: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<AppNavigation[]>();
    const [stausList, setStausList] = useState<IAppStatusList[]>();
    const [roleList, setRoleList] = useState<AppUserRoleMaster[]>();
    const [error, setError] = useState('');

    const ApiStore = useContext(ApiContext);
    useEffect(() => {    
        setLoading(true); 

        ApiStore.getRoleList().then( res => {
            setRoleList(res);
        })

        ApiStore.getStatusList(ActionConfig.NavigationTableID).then( res => {
            setStausList(res);
        })

        ApiStore.LoadDataList(ActionConfig.NavigationList, setData, setLoading, setError );
 
        
    },[ApiStore, ApiStore.LoadDataList]);

   
    const TableColumns = [     
        {title: "Order", field: "Order", defaultSort: "asc"},
        { title: "Title", field: "Title", defaultSort: "asc",
          render :  (values: any) => { return <Link to={`/NavigationEdit/${values.Id}`} >{values.Title}</Link> }  },   
        { title: "StatusId", field: "StatusId",
          render : (values: any) => {  return stausList &&  (stausList as IAppStatusList[]).find( u => u.Id === Number(values.StatusId) )?.Title }
        },  
        {title: "Path", field: "Path"},
        {title: "Icon", field: "Icon"},
        {title: "UserAccessRoles1", field: "UserAccessRoles", 
         render : (values: any) => {  return ApiStore.rolesName(roleList as any, values.UserAccessRoles)   }},          
    ];

    const ImportTable = (evt:any) => {
        // setError('');        
        var files = evt.target.files; // FileList object
        var xl2json = new ExcelToJSON();
        xl2json.parseExcel(files[0]);
        evt.target.value = null;  
      };


    class ExcelToJSON {
       
        parseExcel = function(file:any) {
            
            var reader = new FileReader();

            reader.onload = function(e:any) {
                debugger;
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                type: 'binary'
                });

                // workbook.SheetNames.forEach(function(sheetName) {
                //     var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);                                                           
                //     (XL_row_object as AppNavigation[]).forEach(function (item:AppNavigation) {
                //         var v = item.Title;
                //     });   
                //    return;               
                // });
                let formData = new FormData();
                ApiStore.ExecuteAction(formData, setError);

                var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);  
                // ( async() => { 
                //     await Promise.all(
                //         var v = item.Title;
                //         // formData.append('ActionId', actionId.toString() ); 
                //         // formData.append('Parm1', JSON.stringify(values) );
                //         // formData.append('ItemId',  values.Id );                      
                //     );                                                 
                // })();

                ( async() => { 

                    var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
                    var items = XL_row_object as AppNavigation[];

                    await Promise.all(
                        items.map( async (item:AppNavigation) => {

                            var roles:AppUserRoleMaster[] = [];
                            var role:AppUserRoleMaster = new AppUserRoleMaster();
                            role.Id = "5fc020d1-4729-4bda-a2ae-1d4b3ca56c20";
                            role.Name = "All Users";
                            roles.push(role);
                            item.UserAccessRoles = roles;

                            let formData = new FormData();
                            formData.append('ActionId', "3" ); 
                            formData.append('Parm1', JSON.stringify(item) );  
                            ApiStore.ExecuteAction(formData, setError).then( (res) => {
                                console.log("res");
                            });                            
                        })
                    );

                    alert("Updated");

                    
                })();

            }

            reader.onerror = function(ex) {
                console.log(ex);
            };
      
            reader.readAsBinaryString(file);
        }        
    }      

    const TableActions = [
            {          
                icon: (values: any) => { return <TableButton  label="Add New" path="/NavigationEdit" /> },
                tooltip: 'Add New',
                isFreeAction: true, 
                onClick: (event:any) =>{  },                                     
            },
            {          
                icon: (values: any) => { return <TableButton  label="Refresh"  /> },
                tooltip: 'Refresh',
                isFreeAction: true, 
                onClick: (event:any) =>{  ApiStore.LoadDataList(ActionConfig.NavigationList, setData, setLoading, setError ); },                                     
            },
            {          
                icon: (values: any) => { 
                    return <Button  variant="contained" color="primary"  component="label" size="small" >
                                Upload Data<input type="file" multiple={false} onChange={ImportTable}  id="raised-button-file" style={{display: "none",}} />
                           </Button>  },
                tooltip: 'Import Table',
                isFreeAction: true,
                onClick: (event:any) =>{  },   
                iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
            },
        ]; 

    const DataUpload = (values: any) => {

    }

    if(loading){
        return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return(
        <React.Fragment>
       
        <ErrorMessage message={error} />                           
        { data &&          
            <MaterialTable                    
              title="Navigation List"
              data={data as AppNavigation[]}
              columns={TableColumns as any}
              actions={TableActions as any}
              options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10,  tableLayout: "auto"}}/>
        }       
        </React.Fragment>
        
    )
}

export default observer(NavigationList);