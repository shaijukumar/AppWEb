import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { AppTableMasterContext } from './AppTableMasterStore';
import XLSX from "xlsx";
import { validate, parse } from 'fast-xml-parser';

import MaterialTable from 'material-table';
import TableDetails from './TableDetails';
import { AppTableMaster } from './AppTableMaster';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { AppStatusList } from '../AppStatusList/AppStatusList';
import { AppColumnMaster } from '../AppColumnMaster/AppColumnMaster';
import { AppFlow } from '../AppFlow/AppFlow';
import { AppAction, AppExport } from '../AppAction/AppAction';
import { ColumnAttachmentType, ColumnDataType } from '../../app/common/SystemConstants';
import { AppActionContext } from '../AppAction/AppActionStore';
import { AppStatusListContext } from '../AppStatusList/AppStatusListStore';
import { AppFlowContext } from '../AppFlow/AppFlowStore';
import { AppColumnMasterContext } from '../AppColumnMaster/AppColumnMasterStore';
import { AppConfigTypeContext } from '../AppConfigType/AppConfigTypeStore';
import ErrorMessage from '../../app/common/common/ErrorMessage';



const AppTableMasterList: React.FC = () => {
    const [error, setError] = useState('');
    const AppTableMasterStore = useContext(AppTableMasterContext);   
    const [open, setOpen] = React.useState(false);
 
    const AppFlowStore = useContext(AppFlowContext);
    const AppColumnMasterStore = useContext(AppColumnMasterContext);
    const AppActionStore = useContext(AppActionContext); 
    const AppStatusListStore = useContext(AppStatusListContext);
    const AppConfigTypeStore = useContext(AppConfigTypeContext);

      
  
    const handleClose = () => {
      setOpen(false);
    };

    const ImportTable = (evt:any) => {
      setError('');
      
      var files = evt.target.files; // FileList object
      var xl2json = new ExcelToJSON();
      xl2json.parseExcel(files[0]);
      evt.target.value = null;

      // AppConfigTypeStore.getList().then( (configTyps:any) => {

      // });

      
    };

    const delay = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    class ExcelToJSON {
      
      
      

      parseExcel = function(file:any) {
       
        
        var reader = new FileReader();

        reader.onload = function(e:any) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: 'binary'
          });

          var TableName = '';
          var statusList:AppStatusList[] = [];
          var columnList:AppColumnMaster[] = [];
          var flowList:AppFlow[] = [];
          var actionList:AppExport[] = [];

          // ( async() => { 
          //   var data =   await AppConfigTypeStore.getList(); 
          //   var data1 =   await AppFlowStore.getFlowList(1); 
          //            
          // })(); 
         


          AppConfigTypeStore.getList().then( (configTyps:any) => {

            workbook.SheetNames.forEach(function(sheetName) {
                          
              var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); //sheet_to_row_object_array
              var json_object = JSON.stringify(XL_row_object);
              if( sheetName == "Table"){
                TableName = (XL_row_object as any)[0].Title;
                if(!TableName){
                  AddError(`Empty Table Name`);                  
                }                
              }
              else if( sheetName == "StatusList"){                
                (XL_row_object as any).forEach(function (statusItm:any) {

                  var stFind:any =  statusList.find( (u:any) => u.Title === statusItm.Title ); 
                  if(stFind != null){
                    AddError(`Duplicate status ${statusItm.Title}`);
                    return;
                  }
                  var status:AppStatusList = new AppStatusList();
                  status.Title = statusItm.Title;
                  status.Order = statusItm.Order;
                  statusList.push(status);
                });
                
              }
              else if( sheetName == "ColumnList"){

                
                (XL_row_object as any).forEach(function (columnItm:any) {
                  var column:AppColumnMaster = new AppColumnMaster();
                  column.Title = columnItm.Title;               
                  var stFind:any =  columnList.find( (u:any) => u.Title === columnItm.Title ); 

                  column.Order = columnItm.Order;

                  if(stFind != null){
                    AddError(`Duplicate column ${columnItm.Title}`);
                    return;
                  }

                  if(columnItm.Type){
                    var v = ColumnDataType.find( u => u.value === columnItm.Type );
                    if(v){
                      column.Type = (v as any).Id ? (v as any).Id : ''; 
                    }
                    else{
                      AddError(`Invalid column type ${columnItm.Type}`);
                      return;
                    }              
                  }
                  if(!column.Type){
                    AddError(`Invalid column type ${columnItm.Type}`);
                    return;
                  }

                  if(column.Type == "6" ){//Config type

                    if(columnItm.Config){
                      var v1:any =  configTyps.find( (u:any) => u.Title === columnItm.Config );                     
                      if(v1){
                        column.ConfigId = (v as any).Id ? (v as any).Id : ''; 
                      }
                      else{
                        AddError(`Invalid Config  ${columnItm.Config}`);
                        return;
                      }              
                    }
                    if(!column.ConfigId){
                      AddError(`Invalid Config  ${columnItm.Config}`);
                      return;
                    }
                  }

                  if(column.Type == "7" ){//Attachment

                    if(columnItm.AttachmentConfig){

                      var v2 = ColumnAttachmentType.find( u => u.value === columnItm.AttachmentConfig.toString() );
                      if(v2){
                        column.AttachmentConfig = (v2 as any).value ? (v2 as any).Id : ''; 
                      }                      
                      else{
                        AddError(`Invalid AttachmentConfig  ${columnItm.AttachmentConfig}`);
                        return;
                      }              
                    }
                    if(!column.AttachmentConfig){
                      AddError(`Invalid AttachmentConfig  ${columnItm.AttachmentConfig}`);
                      return;
                    }
                  }

                  columnList.push(column);
                });
                
              }
              else if( sheetName == "FlowList"){

                
                (XL_row_object as any).forEach(function (flowItm:any) {
                  var flow:AppFlow = new AppFlow();
                  flow.Title = flowItm.Title;

                  var stFind:any =  flowList.find( (u:any) => u.Title === flowItm.Title ); 
                  if(stFind != null){
                    AddError(`Duplicate FlowList ${flowItm.Title}`);
                    return;
                  }

                  

                  flowList.push(flow);

                  var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[flowItm.Title]); 
                  
                  (XL_row_object as any).forEach(function (actionItm:any) {

                    var action:AppExport = new AppExport();
                    action.Order = actionItm.Order;
                    action.FlowName = flowItm.Title;
                    

                    if(  actionItm.ActionType === "Action" || actionItm.ActionType === "Query" || actionItm.ActionType === "FileDownload" ){
                      action.ActionType = actionItm.ActionType;
                    }
                    else{
                      AddError(`Invlaid ActionType ${action.ActionType}`);
                      return;
                    }
                    action.InitStatus = actionItm.InitStatus;

                    if(actionItm.FromStatus){
                      actionItm.FromStatus.split(',').forEach(function (st:any) {
                        st = st.trim();
                        if(st){
                          var stFind:any =  statusList.find( (u:any) => u.Title === st );
                          if(!stFind){
                            AddError(`Invlaid From Status ${st}`);
                            return;
                          }
                        }
                      });
                      action.FromStatus = actionItm.FromStatus;
                    }
                    
                    action.Action = actionItm.Action;
                    if(actionItm.ToStatus){
                      actionItm.ToStatus = actionItm.ToStatus.trim();
                      var stFind:any =  statusList.find( (u:any) => u.Title === actionItm.ToStatus );
                      if(!stFind){
                        AddError(`Invlaid To Status ${actionItm.ToStatus}`);
                        return;
                      }
                      action.ToStatus = actionItm.ToStatus;
                    }

                    if(actionItm.WhenXml){

                      if( validate(actionItm.WhenXml) === true) {
                        action.WhenXml = actionItm.WhenXml;
                      }
                      else{
                        AddError(`Invlaid When XML for action - ${actionItm.Action}`);
                        return;
                      }                      
                    }
                    if(actionItm.ActionXml){

                      if( validate(actionItm.ActionXml) === true) {
                        action.ActionXml = actionItm.ActionXml;
                      }
                      else{
                        AddError(`Invlaid Action XML for action -  ${actionItm.Action}`);
                        return;
                      }                      
                    }

                    actionList.push(action);
                  });

                });              
              }              
            });
           
            if(err){
              setError( err );
              return;
            }
            //return;

            debugger;
            ( async() => { 

              //Create Table
              var tab = new AppTableMaster();
              tab.Title = TableName;
              var tableObj = await AppTableMasterStore.editItem(tab);
              if(!CheckError(tableObj)) return;

              await Promise.all(
                statusList.map( async (status:AppStatusList) => {
                  status.TableId = tableObj.Id;                  
                  const stRes = await AppStatusListStore.editItem(status);
                  if(!CheckError(stRes)) return;
                  status.Id = stRes.Id;
                } )                              
              );

              var colCouter = 0;
              if(columnList.length>0)
                do{
                  columnList[colCouter].TableID = tableObj.Id;
                  const resObj = await AppColumnMasterStore.editItem(columnList[colCouter]);
                  if(!CheckError(resObj)) return;
                  columnList[colCouter].Id = resObj.Id;
                  colCouter++;
                }while(colCouter < columnList.length )

              // await Promise.all(
              //   columnList.map( async (column:AppColumnMaster) => {
              //     column.TableID = tableObj.Id;
              //     const resObj = await AppColumnMasterStore.editItem(column);
              //     if(!CheckError(resObj)) return;
              //     column.Id = resObj.Id;
              //   } )                              
              // );
              
              await Promise.all(
                flowList.map( async (flow:AppFlow) => {
                  flow.TableId = tableObj.Id;
                  const resObj = await AppFlowStore.editItem(flow);
                  if(!CheckError(resObj)) return;
                  flow.Id = resObj.Id;                  
                } )                              
              );

              await Promise.all(
                actionList.map( async (actObj:AppExport) => {
                  var action:AppAction = new AppAction();

                  action.TableId = tableObj.Id;
                  
                  
                  action.Order = actObj.Order;
                  action.Action = actObj.Action;                 
                  action.ActionType = actObj.ActionType;                  
                  action.WhenXml = actObj.WhenXml;
                  action.ActionXml = actObj.ActionXml;

                  if(actObj.InitStatus == "Yes"){
                    action.InitStatus = true;
                  }
                  else{
                    action.InitStatus = false;
                  }

                  //FlowName
                  var flFind:any =  flowList.find( (u:any) => u.Title === actObj.FlowName );
                  if(flFind){
                    action.FlowId = flFind.Id;
                  }
                  else{
                    AddError(`Invlaid FlowName - ${actObj.FlowName}`);
                  }

                  //ToStatusId
                  if(actObj.ToStatus){
                      var stFind:any =  statusList.find( (u:any) => u.Title === actObj.ToStatus );
                      if(stFind){
                        action.ToStatusId = stFind.Id;
                      }
                      else{
                        AddError(`Invlaid ToStatus - ${actObj.ToStatus}`);
                      }
                  }
                  

                  let FromStatusList : AppStatusList[] = [];

                  
                  if(actObj.FromStatus){
                    actObj.FromStatus.split(',').forEach(function (st:any) {
                      st = st.trim();
                      if(st){                        
                        var stFind:any =  statusList.find( (u:any) => u.Title === st );
                        if(!stFind){
                          AddError(`Invlaid From Status ${st}`);                          
                        }
                        else{
                          FromStatusList.push(stFind);
                        }
                      }
                    });
                    
                  }
                  action.FromStatusList = FromStatusList;

                  const resObj = await AppActionStore.editItem(action);
                  if(!CheckError(resObj)) return;
                  action.Id = resObj.Id;
                } )                              
              );

              if(err){
                setError( err );
                return;
              }
              else{
                alert( "Updated" );                
              }
              AppTableMasterStore.getList(); 
              //var data1 =   await AppFlowStore.getFlowList(1); 
              debugger;
            
            })();

          });

        };

        reader.onerror = function(ex) {
          console.log(ex);
        };

        reader.readAsBinaryString(file);
      };          
    };

    var err = '';
    const AddError = (message:string) => {
      err =  `${err} ${err ? ', ' : '' } ${message.trim()}`;     
    };
    const CheckError = (val:any) => {
      if(val.errors){
        AddError(val.errors.Error);
        setError(err);
        return false;
      }     
      else{
        return true;
      }
    };

    useEffect(() => {       
      AppTableMasterStore.getList();                  
    }, [AppTableMasterStore, AppTableMasterStore.getList])       

    // if(AppTableMasterStore.loading){
    //   return <LinearProgress color="secondary"  className="loaderStyle" />     
    // }

    const TableColumns = [
      {
        title: "Title",
        field: "Title",          
        defaultSort: "asc",
        //render :  (values: any) => { return <NavLink to={"/AppTableMasterItemEdit/" + values.Id } >{values.Title}</NavLink> } 
      },  
      {
        title: "Details",
        field: "Details", 
        render : (values: any) => { return <TableDetails showTitle={false} tableId={values.Id}  /> },              
        editable: "never",    
      },  
    ];

    const TableActions = [
      {          
          icon: (values: any) => { 
              return <Button  variant="contained" color="primary"  component="label" size="small" >
                      Import Table<input type="file" multiple={false} onChange={ImportTable}  id="raised-button-file" style={{display: "none",}} />
                     </Button>  },
          tooltip: 'Import Table',
          isFreeAction: true,
          onClick: (event:any) =>{  },   
          iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
      },      
    ];


  
    return (
      <React.Fragment>   
        <ErrorMessage message={error} /> 
                
        <div className={"tabcontainers1"}>
          <div className={"tabcontainers2"} >     
            {AppTableMasterStore.itemList  &&   
            <MaterialTable                    
              title="Table List"
              data={AppTableMasterStore.itemList}
              columns={TableColumns as any}
              actions={TableActions}
              options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10,  tableLayout: "auto"}}

              cellEditable={{
                onCellEditApproved: (newValue:any, oldValue:any, rowData:any, columnDef:any) => {
                  debugger;       
                  //let filedName : any =  "Title"; //columnDef.field == null ? columnDef.field as string : "Title" 
                  return new Promise((resolve, reject) => {
                    (rowData as any)[columnDef.field as string] = newValue;                   
                    AppTableMasterStore.editItem(rowData).then((val) =>{   
                      
                      if((val as any).errors){
                        setError((val as any).errors.Error);                         
                        reject();                                        
                        setOpen(true);                                                     
                      }    
                      else{
                        resolve();
                      }               
                                                        
                    });                                    
                  });
                }
              }}

              editable={{
                onRowAdd: (newData:any) => new Promise(resolve => { 
                  debugger;
                  var tab = new AppTableMaster();
                  tab.Title = newData.Title;
                  AppTableMasterStore.editItem(tab).then((val) =>{  
                    AppTableMasterStore.getList();                   
                    resolve(true);                                
                  }) 
                }),

               

                  
                onRowDelete: (oldData:any) =>
                  new Promise((resolve, reject) => {
                    
                    setTimeout(() => {
                      debugger;
                        var itemId = Number((oldData as any).Id);
                        AppTableMasterStore.deleteItem(itemId).then((val) =>{  
                          debugger;

                          if((val as any).errors){
                            setError((val as any).errors.Error);   
                            resolve(true);
                            //alert(error);      
                            setOpen(true);                                                     
                          }                                                  
                          AppTableMasterStore.getList().then( () => {resolve(true);});                                          
                                                      
                        })                  
                      resolve(true);
                    }, 10)
                  }),
              }}                          
            />
          }
          </div>
        </div>
      
      
      <Dialog
        open={open}
        onClose={handleClose}
      >
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>          
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      
      </React.Fragment>     
     
    );
};

export default observer(AppTableMasterList);
