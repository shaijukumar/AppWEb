import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AppColumn from '../AppColumnMaster/AppColumn';
import { AppColumnMaster } from '../AppColumnMaster/AppColumnMaster';
import TableDetails from './TableDetails';
import MaterialTable from 'material-table';
import MessageDialog from '../../app/common/common/MessageDialog';
import moment from 'moment';
import { AppStatusList } from '../AppStatusList/AppStatusList';
import { AppFlowContext } from '../AppFlow/AppFlowStore';

interface DetailParms {
    id: string;
  }

  const TableFlowList: React.FC = () => {

    const { id } = useParams<DetailParms>();
    const AppFlowStore = useContext(AppFlowContext);

    const [open, setOpen] = useState(false);
    const [selectedColumn] = useState(new AppColumnMaster());
   
    const [dialogMessage, setDialogMessage] = useState('');
    const [timeStamp, setTimeStamp] = useState('');
    const showDialogBox = (message: string) => {  
        setDialogMessage(message);
        setTimeStamp(moment().toString());
    };


    useEffect(() => {
      AppFlowStore.getFlowList(Number(id));
    }, [id,AppFlowStore, AppFlowStore.getFlowList]);

    const TableColumns = [   
        { title: "Id", field: "Id"},                
        { title: "Title", field: "Title"},                        
      ];
   
 
    const RefreshColumns = (col: AppColumnMaster) => {      
      AppFlowStore.getFlowList(Number(id));
        setOpen(false);
    };

    return(
    <React.Fragment>
        <TableDetails tableId={Number(id)}  />

        <MaterialTable                    
              title="Status List"
              data={AppFlowStore.tableFlows as any}
              columns={TableColumns as any}
              //actions={TableActions}
              options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10,  tableLayout: "auto"}}


              editable={{

                onRowAdd: newData => new Promise(resolve => { 

                  var tab = new AppStatusList();
                  tab.Title = (newData as any).Title;
                  tab.Order = (newData as any).Order;
                  tab.TableId = Number(id);
                  AppFlowStore.editItem(tab).then((val) =>{  
                    AppFlowStore.getFlowList(Number(id));                   
                    resolve(true);                                
                  })
                }),

                onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  debugger;
                  var tab = new AppStatusList();
                  tab.Title = (newData as any).Title;
                  tab.Order = (newData as any).Order;
                  tab.TableId = Number(id);
                  tab.Id =  (newData as any).Id;
                  AppFlowStore.editItem(tab).then((val) =>{  
                    AppFlowStore.getFlowList(Number(id));                   
                    resolve(true);                                
                  })
                  resolve(true);           
                }),


                onRowDelete: oldData =>
                new Promise((resolve, reject) => {                  
                  setTimeout(() => {
                      debugger;
                      var itemId = Number((oldData as any).Id);
                      AppFlowStore.deleteItem(itemId).then((val) =>{  
                        debugger;

                        if((val as any).errors){                         
                          showDialogBox((val as any).errors.Error);                                                
                          resolve(true);                                                
                        }   
                        else if((val as any).name === 'Error') {                             
                            showDialogBox( (val as any).message );                                
                            resolve(true); 
                        }                                               
                        AppFlowStore.getFlowList(Number(id)).then( () => {resolve(true);});                                          
                                                    
                      })                  
                    resolve(true);
                  }, 10)
                }),
              }}
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

export default observer(TableFlowList);