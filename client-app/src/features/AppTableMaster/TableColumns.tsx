import { Dialog, DialogTitle, DialogContent, DialogContentText, Link } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppTableMaster } from './AppTableMaster';
import { AppTableMasterContext } from './AppTableMasterStore';
import { observer } from 'mobx-react-lite';
import { AppColumnMasterContext } from '../AppColumnMaster/AppColumnMasterStore';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AppColumn from '../AppColumnMaster/AppColumn';
import { AppColumnMaster } from '../AppColumnMaster/AppColumnMaster';
import { ColumnDataType } from '../../app/common/SystemConstants';
import TableDetails from './TableDetails';
import MaterialTable from 'material-table';
import TableButton from '../../app/common/form/TableButton';
import MessageDialog from '../../app/common/common/MessageDialog';
import moment from 'moment';

interface DetailParms {
    id: string;
  }

  const TableColumns: React.FC = () => {

    const { id } = useParams<DetailParms>();
    const AppColumnMasterStore = useContext(AppColumnMasterContext);
    const [open, setOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(new AppColumnMaster());
   
    const [dialogMessage, setDialogMessage] = useState('');
    const [timeStamp, setTimeStamp] = useState('');
    const showDialogBox = (message: string) => {  
        setDialogMessage(message);
        setTimeStamp(moment().toString());
    };


    useEffect(() => {
        AppColumnMasterStore.getColumnList(Number(id));

    }, [id,AppColumnMasterStore.getColumnList]);

    const TableColumns = [
        {
          title: "Title",
          field: "Title",          
          defaultSort: "asc",
          render :  (values: any) => { return <Link onClick={ () => { openModel( values ) } } >{values.Title}</Link> } 
        },  
        {
          title: "Type",
          field: "Type", 
          render : (values: any) => { return ColumnDataType.find( u => u.Id === values.Type )?.value  },                          
        },  
        {
            title: "AppDataFiled",
            field: "AppDataFiled",                     
        },          
      ];

    const TableActions = [
    {          
        icon: (values: any) => { return <TableButton  label="Add New"  /> },
        tooltip: 'Add New',
        isFreeAction: true,
        onClick: (event:any) =>{ openModel( new AppColumnMaster() ) },   
        iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
    },
    {          
        icon: (values: any) => { return <TableButton label="Refresh"  /> },
        tooltip: 'Refresh',
        isFreeAction: true,
        onClick: (event:any) =>{ AppColumnMasterStore.getColumnList(Number(id));},   
        iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
        }
    ];  

    const openModel = (col: AppColumnMaster) => {  
        if(!col.TableID){
            col.TableID = Number(id);
        }
        setSelectedColumn(col);
        setOpen(true);
    };

    const RefreshColumns = (col: AppColumnMaster) => {      
        AppColumnMasterStore.getColumnList(Number(id));
        setOpen(false);
    };

    return(
    <React.Fragment>
        <TableDetails tableId={Number(id)}  />

        <MaterialTable                    
              title="Fields"
              data={AppColumnMasterStore.columnList as any}
              columns={TableColumns as any}
              actions={TableActions}
              options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10,  tableLayout: "auto"}}
              editable={{
                onRowDelete: oldData =>
                new Promise((resolve, reject) => {                  
                  setTimeout(() => {
                      debugger;
                      var itemId = Number((oldData as any).Id);
                      AppColumnMasterStore.deleteItem(itemId).then((val) =>{  
                        debugger;

                        if((val as any).errors){                         
                          showDialogBox((val as any).errors.Error);                                                
                          resolve(true);                                                
                        }   
                        else if((val as any).name == 'Error') {                             
                            showDialogBox( (val as any).message );
                                
                            resolve(true); 
                          }                                               
                        AppColumnMasterStore.getColumnList(Number(id)).then( () => {resolve(true);});                                          
                                                    
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

export default observer(TableColumns);