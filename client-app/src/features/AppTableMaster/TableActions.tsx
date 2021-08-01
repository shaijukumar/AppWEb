import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import TableDetails from './TableDetails';
import MaterialTable from 'material-table';
import { AppActionContext } from '../AppAction/AppActionStore';
import { AppAction, IAppAction } from '../AppAction/AppAction';
import { AppStatusListContext } from '../AppStatusList/AppStatusListStore';
import { AppFlowContext } from '../AppFlow/AppFlowStore';
import TableButton from '../../app/common/form/TableButton';

interface DetailParms {
    tableId: string;
    id: string;   
  }

const TableActions: React.FC = () => {

    const { tableId, id } = useParams<DetailParms>();
    
    const AppActionStore = useContext(AppActionContext);       
    const AppStatusListStore = useContext(AppStatusListContext);
    const AppFlowStore = useContext(AppFlowContext);
    const [error, setError] = useState('');

    useEffect(() => {     
        //debugger;        
        AppFlowStore.loadItem(Number(id));
        AppActionStore.flowActions(Number(id));
        AppStatusListStore.getStatusList(Number(tableId));            
      }, [id, tableId, AppActionStore, AppActionStore.flowActions,AppStatusListStore, AppStatusListStore.getStatusList, AppFlowStore])

    const ShowDesc = (text: string) => {        
        var res = "";
        if(text){
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text,"text/xml");
        res = xmlDoc.getElementsByTagName("Desc")[0].innerHTML;
        }
        return res;
    };

    const TableColumns = [
        { title: "Id", field: "Id", editable: 'never', },
        { title: "FlowId", field: "FlowId", hidden: true },
        { title: "TableId", field: "TableId", hidden: true },
        {
          title: "Order",
          field: "Order", 
          type: 'numeric',
          defaultSort: "asc",      
         // width: "5%"
        },
        {
          title: "Action", field: "Action",          
          //editable: "never",  
          render : (values: any) => { return <NavLink to={ `/TableActionItemEdit/${tableId}/${values.FlowId}/${values.Id}` } >{values.Action}</NavLink> },
          //render : (values: IAppAction) => { return <NavLink to={"/AppNavigationItemEdit/" + values.Id } >{values.Title}</NavLink> }
          //lookup: { "Resubmit": 'Resubmit', "Approve": 'Approve', "New Request" : "New Request", "Reject" : "Reject"},
          //width: "10%",
          editable: 'never',   
          
        },
        {
          title: "From Status", field: "FromStatus",       
          render : (values: IAppAction) => { return values.FromStatusList.map( (fs, i, arr) =>(<span key={fs.Id} >{fs.Title}{i !== (arr.length-1) ? ',' : ''} </span>) )  },
          //width: "10%"
          editable: 'never',  
        },  
        {
          title: "To Status", field: "FromStatus",       
          render : (values: IAppAction) => { return  AppStatusListStore.AppStatusList.find( u => u.Id === values.ToStatusId )?.Title },
          //width: "10%",
          editable: 'never',  
        },     
        {
          title: "ActionType",  field: "ActionType",
          //render : rend
          //render : (values: IAppHistory) => { return AppStatusListStore.itemList.find( u => u.Id ==values.FromStage )?.Title },
          //width: "10%",
          editable: 'never',  
        }, 
        // {
        //   title: "Flow",
        //   field: "Flow",  
        //   render : (values: IAppAction) => { return AppFlowStore.itemList.find( u => u.Id === values.FlowId )?.Title }  
        // },
        // {
        //   title: "Table",
        //   field: "Table",  
        //   render : (values: IAppAction) => { return AppTableMasterStore.itemList.find( u => u.Id === values.TableId )?.Title  }  
        // },
        {
          title: "WhenXml",
          field: "WhenXml",  
          render : (values: IAppAction) => { return ShowDesc(values.WhenXml)  } ,
          //width: "20%",
          editable: 'never',  
        },
        {
          title: "ActionXml",
          field: "ActionXml",  
          render : (values: IAppAction) => { return ShowDesc(values.ActionXml)  } ,
          //width: "35%",
          editable: 'never',  
        },
        // {
        //   title: "Delete",
        //   field: "Delete",  
        //   render : (values: IAppAction) => { return <DeleteOutlinedIcon onClick={ () => { AppActionStore.deleteItem(values.Id).then( () => {   AppActionStore.getList(); })}}  />  }  
        // },
      ];

    const TableActions = [
        {          
            icon: (values: any) => { return <TableButton  label="Add New" path={`/TableActionItemEdit/${tableId}/${id}`}  /> },
            tooltip: 'Add New',
            isFreeAction: true,
            //onClick: (event:any) =>{ history.push(`/TableActionItemEdit/${tableId}/${id}`) },   
            iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
        },
        {          
            icon: (values: any) => { return <TableButton label="Refresh"  /> },
            tooltip: 'Refresh',
            isFreeAction: true,
            onClick: (event:any) =>{AppActionStore.flowActions(Number(id));},   
            iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
          }
        ];  
    // if(AppActionStore.loading){
    //     return <LinearProgress color="secondary"  className="loaderStyle" />     
    // }

    return(
        <React.Fragment>
            <TableDetails tableId={Number(tableId)} flowId={id} showTitle={true} />
            <div className={"tabcontainers11"}>
            <div className={"tabcontainers2"} >        
                <MaterialTable                       
                    title={`Action List for ${AppFlowStore.item.Title}`}
                    data={AppActionStore.flowList}
                    columns={TableColumns as any}
                    options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10,  tableLayout: "fixed" }}    
                    actions={TableActions as any}
                    
                    
                    cellEditable={{
                        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                          debugger;       
                          //let filedName : any =  "Title"; //columnDef.field == null ? columnDef.field as string : "Title" 
                          return new Promise((resolve, reject) => {
                            
                            (rowData as any)[(columnDef as any).title] = newValue;
                            
                            var action = new AppAction();
                            action.Action =  rowData.Action;
                            action.ActionType =  rowData.ActionType;
                            action.ActionXml =  rowData.ActionXml;
                            action.FlowId =  rowData.FlowId;
                            action.FromStatusList =  rowData.FromStatusList;
                            action.Id =  rowData.Id;
                            action.InitStatus =  rowData.InitStatus ? true : false;
                            action.Order =  rowData.Order;
                            action.TableId =  rowData.TableId;
                            action.ToStatusId =  rowData.ToStatusId;
                            action.WhenXml =  rowData.WhenXml;
  
                            AppActionStore.editItem(action).then((val) =>{ 
                                if((val as any).errors){
                                    alert((val as any).errors.Error);                         
                                    reject();                                                                                                                               
                                }    
                                else{
                                    resolve();
                                }  
                            });                                                        
                            resolve();                                  
                          });
                        }
                      }}

                     
                      
                    />
            </div>
            </div>   

            
        </React.Fragment>

        )
}

export default observer(TableActions);