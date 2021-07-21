import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { AppTableMasterContext } from './AppTableMasterStore';


import MaterialTable from 'material-table';
import TableDetails from './TableDetails';
import { AppTableMaster } from './AppTableMaster';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
  
const AppTableMasterList: React.FC = () => {
    const [error, setError] = useState('');
    const AppTableMasterStore = useContext(AppTableMasterContext);   
    const [open, setOpen] = React.useState(false);
    
  
    const handleClose = () => {
      setOpen(false);
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
  
    return (
      <React.Fragment>              
        <div className={"tabcontainers1"}>
          <div className={"tabcontainers2"} >     
            {AppTableMasterStore.itemList.length > 0  &&   
            <MaterialTable                    
              title="Table List"
              data={AppTableMasterStore.itemList}
              columns={TableColumns as any}
              options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10,  tableLayout: "auto"}}

              cellEditable={{
                onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
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
                onRowAdd: newData => new Promise(resolve => { 
                  debugger;
                  var tab = new AppTableMaster();
                  tab.Title = newData.Title;
                  AppTableMasterStore.editItem(tab).then((val) =>{  
                    AppTableMasterStore.getList();                   
                    resolve(true);                                
                  }) 
                }),

               

                  
                onRowDelete: oldData =>
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
