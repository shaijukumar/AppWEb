import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Chip } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AppColumn from '../AppColumnMaster/AppColumn';
import { AppColumnMaster } from '../AppColumnMaster/AppColumnMaster';
import TableDetails from './TableDetails';
import MaterialTable from 'material-table';
import MessageDialog from '../../app/common/common/MessageDialog';
import moment from 'moment';
import {  AppStatusList, IAppStatusList } from '../AppStatusList/AppStatusList';
import { AppActionContext } from '../AppAction/AppActionStore';
import { AppAction, IAppAction } from '../AppAction/AppAction';
import { AppStatusListContext } from '../AppStatusList/AppStatusListStore';
import { Autocomplete } from '@material-ui/lab';



interface DetailParms {
    tableId: string;
    id: string;
  }

const TableActionsBackup: React.FC = () => {

    const { tableId, id } = useParams<DetailParms>();
    const AppActionStore = useContext(AppActionContext);  
    const AppStatusListStore = useContext(AppStatusListContext);     

    const [open, setOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(new AppColumnMaster());
    const [test, setTest] = useState(false);

    const [personName, setPersonName] = React.useState<string[]>([]);
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPersonName(event.target.value as string[]);
    };

   
    const [dialogMessage, setDialogMessage] = useState('');
    const [timeStamp, setTimeStamp] = useState('');

    const showDialogBox = (message: string) => {  
        setDialogMessage(message);
        setTimeStamp(moment().toString());
    };

    const ShowDesc = (text: string) => {    
    // debugger;
        var res = "";
        if(text){
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text,"text/xml");
            res = xmlDoc.getElementsByTagName("Desc")[0].innerHTML;
        }
        return res;
    };


    useEffect(() => {
        //debugger;
        AppActionStore.flowActions(Number(id));
        AppStatusListStore.getStatusList(Number(tableId));
      //AppFlowStore.flowActions(Number(id));
    }, [id,AppActionStore.flowActions, AppStatusListStore.getStatusList]);

    const TableColumns = [                
        { title: "Action", field: "Action",
            editComponent: (props:any) => (              
                <TextField
                    variant="outlined"
                    type="text" 
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                    placeholder="Action"
                />
            )
        },  
        { 
            title: "From Status", field: "FromStatus",       
            render : (values: IAppAction) => { return values.FromStatusList.map( (fs, i, arr) =>(<span key={fs.Id} >{fs.Title}{i !== (arr.length-1) ? ',' : ''} </span>) )  },           
            editComponent: (props:any) =>(                        

                <Autocomplete  value={props.rowData.FromStatusList} multiple id="FromStatusList"   
                    style={{width:'250px', padding:'2px', margin:'1px'}}       
                    options={AppStatusListStore.AppStatusList as any[]} getOptionLabel={(option:AppStatusList) => option.Title}                  
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option:any, index) => (
                            props.rowData.FromStatusList  && <Chip variant="outlined" label={option.Title} {...getTagProps({ index })} /> 
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="From Status" placeholder="From Status" fullWidth />
                    )}
                    
                    onChange={(event:any, newValue:any) => {
                        debugger;
                        var unq = true;
                        for(let i=0;i<newValue.length-1;i++){
                                if( newValue[i].Id === newValue[newValue.length-1].Id){
                                    unq = false;
                                    break;
                                }
                            }
                            if(unq){    
                                props.rowData.FromStatusList = newValue;
                                event.target.value= newValue;
                                setTest(!test);
                                //setFromStatusList(newValue); 
                            }                                          
                    }}
                />

            )
        }, 
        {
            title: "To Status", field: "ToStatusId",       
            render : (values: IAppAction) => { return  AppStatusListStore.AppStatusList.find( u => u.Id === values.ToStatusId )?.Title },
            editComponent: (props:any) =>              
            (              
                // <Select
                //     value={props.value}
                //     onChange={e => props.onChange(e.target.value)} >
                //     <option aria-label="None" value="" ></option>
                //     {AppStatusListStore.AppStatusList.map( (row:IAppStatusList) => (
                //         <option aria-label="None" value={row.Id} key={row.Id} >{row.Title}</option>
                //     ) )}                    
                // </Select>

                <Autocomplete       
                    value={AppStatusListStore.AppStatusList.find( u => u.Id === props.value )}                       
                    options={AppStatusListStore.AppStatusList as any[]} 
                    getOptionLabel={(option:AppStatusList) => option.Title}     
                                   
                    style={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="To Status" variant="outlined" />}
                    
                />
            )
            
        },  
        {
            title: "WhenXml", field: "WhenXml",  
            render : (values: IAppAction) => { return ShowDesc(values.WhenXml)  }  
        },
        {
            title: "ActionXml", field: "ActionXml",  
            render : (values: IAppAction) => { return ShowDesc(values.ActionXml)  }  
        },                 
      ];
   
    const openModel = (col: AppColumnMaster) => {  
        if(!col.TableID){
            col.TableID = Number(id);
        }
        setSelectedColumn(col);
        setOpen(true);
    };

    const RefreshColumns = (col: AppColumnMaster) => {      
        AppActionStore.flowActions(Number(id));
        setOpen(false);
    };

    return(
    <React.Fragment>
        <TableDetails tableId={Number(tableId)}  />

        <MaterialTable                    
              title="Status List"
              data={AppActionStore.flowList as any}
              columns={TableColumns as any}
              //actions={TableActions}
              options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10,  tableLayout: "auto"}}

              editable={{
                onRowAdd: (newData : AppAction) =>
                new Promise((resolve, reject) => {
                    var v = newData; // as AppAction;
                    //AppAction a1 = new AppAction(v);
                    debugger;
                    
                  setTimeout(() => {                    
                    resolve(true);
                  }, 1000)
                }),
                onBulkUpdate: changes =>
                  new Promise((resolve, reject) => {

                    var v = changes;
                    debugger;
                    setTimeout(() => {
                      resolve(true);
                    }, 1000);
                  }),     
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      resolve(true);
                    }, 1000);
                  }),     
              }}


            //   editable={{

            //     onRowAdd: newData => new Promise(resolve => { 
            //       debugger;
            //       var v = newData;
            //       var tab = new AppAction();
            //     //   tab.Title = (newData as any).Title;
            //     //   tab.Order = (newData as any).Order;
            //     //   tab.TableId = Number(id);
            //     //   AppActionStore.editItem(tab).then((val) =>{  
            //     //     AppActionStore.flowActions(Number(id));                   
            //     //     resolve(true);                                
            //     //   })
            //     }),

            //     onRowUpdate: (newData, oldData) =>
            //     new Promise((resolve, reject) => {
            //       debugger;
            //     //   var tab = new AppStatusList();
            //     //   tab.Title = (newData as any).Title;
            //     //   tab.Order = (newData as any).Order;
            //     //   tab.TableId = Number(id);
            //     //   tab.Id =  (newData as any).Id;
            //     //   AppActionStore.editItem(tab).then((val) =>{  
            //     //     AppActionStore.flowActions(Number(id));                   
            //     //     resolve(true);                                
            //     //   })
            //       resolve(true);           
            //     }),


            //     onRowDelete: oldData =>
            //     new Promise((resolve, reject) => {                  
            //       setTimeout(() => {
            //           debugger;
            //           var itemId = Number((oldData as any).Id);
            //           AppActionStore.deleteItem(itemId).then((val) =>{  
            //             debugger;

            //             if((val as any).errors){                         
            //               showDialogBox((val as any).errors.Error);                                                
            //               resolve(true);                                                
            //             }   
            //             else if((val as any).name == 'Error') {                             
            //                 showDialogBox( (val as any).message );                                
            //                 resolve(true); 
            //             }                                               
            //             AppActionStore.flowActions(Number(id)).then( () => {resolve(true);});                                          
                                                    
            //           })                  
            //         resolve(true);
            //       }, 10)
            //     }),
            //   }}
        />

        <Dialog onClose={() => {}} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Column</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <AppColumn initVal={selectedColumn} parentRefresh={RefreshColumns} />
            </DialogContentText>
            </DialogContent>           
        </Dialog>  

    <MessageDialog message={dialogMessage} timeStamp={timeStamp} />

    </React.Fragment>)
}

export default observer(TableActionsBackup);