import { Button, ButtonGroup, Checkbox, Chip, Container,  FormControlLabel, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { observer } from 'mobx-react-lite';
import { Autocomplete } from '@material-ui/lab';
import { AppStatusList } from '../AppStatusList/AppStatusList';
import { AppStatusListContext } from '../AppStatusList/AppStatusListStore';
import MyDropDown from '../../app/common/form/MyDropDown';
import { AppTableMasterContext } from '../AppTableMaster/AppTableMasterStore';
import { AppFlowContext } from '../AppFlow/AppFlowStore';
import { AppActionContext } from '../AppAction/AppActionStore';
import { AppAction } from '../AppAction/AppAction';
import ErrorMessage from '../../app/common/common/ErrorMessage';

interface DetailParms {
    tableId: string;
    flowId: string;
    id: string;
}

const TableActionItemEdit: React.FC = () => {

    const { tableId, flowId, id } = useParams<DetailParms>();

    const AppFlowStore = useContext(AppFlowContext);  
    const AppActionStore = useContext(AppActionContext);
    const AppStatusListStore = useContext(AppStatusListContext);
    const AppTableMasterStore = useContext(AppTableMasterContext);

    let history = useHistory();
    const [item, setItem] = useState(new AppAction());
    const [loading, setLoading] = useState(true);
    const [fromStatusList, setFromStatusList] = useState<AppStatusList[]>();
    const [error, setError] = useState('');

    const ActionTypeList = [{Id: "Action", Title: 'Action'}, {Id: "Query", Title: 'Query'}, {Id: "FileDownload", Title: 'FileDownload'}];

    useEffect(() => {
        debugger;
        AppTableMasterStore.loadItem(Number(tableId));
        AppFlowStore.loadItem(Number(flowId));


        AppFlowStore.loadItem(Number(flowId));                    
        AppStatusListStore.getStatusList(Number(tableId));
        if (id) {
          AppActionStore.loadItem(Number(id)).then((val) => {                
            val!.InitStatus = val!.InitStatus ? true : false;
    
            setItem(val as AppAction);   
            setFromStatusList(val?.FromStatusList);
            setLoading(false);   
          });
        } else {
          setItem(new AppAction()); 
          setLoading(false);     
        }
        
      }, [id, flowId, tableId, AppTableMasterStore, AppTableMasterStore.loadItem, AppFlowStore, AppActionStore, AppFlowStore.loadItem, AppActionStore.loadItem,  AppStatusListStore, AppStatusListStore.getStatusList]);


    const onItemSubmit = (values: any) => {  
        debugger;
        setLoading(true);
        values.FromStatusList = fromStatusList;        
        values.FlowId = Number(flowId);    
        values.TableId = Number(tableId); 

        AppActionStore.editItem(values).then((val) => {
          debugger;
          if((val as any).errors){
            setError((val as any).errors.Error);  
            setLoading(false);              
            return;
          }
          else{
            history.push(`/TableActions/${tableId}/${flowId}`);
          }            
        });
    };


    if(loading){
        return <LinearProgress color="secondary"  className="loaderStyle" /> 
    }

    return(
    <Container component="main" maxWidth="xl">  
        <ErrorMessage message={error} /> 
        <Formik
            initialValues={item}
            validationSchema={Yup.object({
              Action: Yup.string().required('Title required'),                     
            })}
            onSubmit={onItemSubmit}
          >
            <Form > 
            <Chip label={`Table : ${AppTableMasterStore.item.Title}`} color="primary" style={{margin:'5px'}}/>
            <Chip label={`Flow : ${AppFlowStore.item.Title}`}  color="primary"/><br/>

            <MyCustomTxt  name="UniqName" type="text"  autoFocus={true} required={true} label="Uniq Name" /> 
            <MyCustomTxt width="200px"  name="Order" type="number" required={true} label="Order" /> 
                                                  
            <FormControlLabel control={<Checkbox checked={item.InitStatus}  />} label="Init Status"            
                onChange={ () => { item.InitStatus = item.InitStatus ? false : true; setItem(item);  }}           
            />
               
              <MyDropDown width='200px' value={item.ActionType} label="ActionType" list={ActionTypeList as any} name="ActionType" /> 
              {/* <MyDropDown width='200px' value={item.FlowId} label="Flow" list={AppFlowStore.itemList as any} name="FlowId" />   */}
              {/* <MyDropDown value={item.TableId} label="Table" list={AppTableMasterStore.itemList as any} name="TableId" 
                handleChange={ (event: any) => { 
                  debugger;
                  item.TableId = Number(event.target.value);
                  setItem(item);
                  AppStatusListStore.getStatusList(Number(event.target.value));
                }} /> */}
  
              <Autocomplete  className="customFieldMargin"  value={fromStatusList} multiple id="FromStatusList"          
                options={AppStatusListStore.AppStatusList as any[]} getOptionLabel={(option:AppStatusList) => option.Title}                  
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option:any, index) => (
                    fromStatusList  && <Chip variant="outlined" label={option.Title} {...getTagProps({ index })} /> 
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
                    setFromStatusList(newValue); 
                  }                                          
                }}
              />
  
              <MyCustomTxt  name="Action" type="text"  autoFocus={true} required={true} label="Action" />              
              <MyDropDown value={item.ToStatusId} label="To Status" list={AppStatusListStore.AppStatusList as any} name="ToStatusId" />                    
              <MyCustomTxt value={item.WhenXml} label="WhenXml" type="text" name="WhenXml"  multiline={true}  /> 
              <MyCustomTxt value={item.ActionXml} label="ActionXml" type="text" name="ActionXml"  multiline={true}  />                 
  
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"                  
                >
                  Save
                </Button> 
                { item.Id && 
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"                    
                    onClick={ () => {
                      AppActionStore.deleteItem(item.Id).then( () => {
                        history.push('/AppActionlist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push(`/TableActions/${tableId}/${flowId}`);  }}>Back</Button>          
              </ButtonGroup>
  
            </Form>
          </Formik>
      </Container>
  
    )
}

export default observer(TableActionItemEdit);