import { Button, ButtonGroup, Checkbox, Chip, Container, FormControl, FormControlLabel, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppAction } from './AppAction';
import { AppActionContext } from './AppActionStore';
import { observer } from 'mobx-react-lite';
import { Autocomplete } from '@material-ui/lab';
import { AppStatusList } from '../AppStatusList/AppStatusList';
import { AppStatusListContext } from '../AppStatusList/AppStatusListStore';
import MyDropDown from '../../app/common/form/MyDropDown';
import { AppConfigContext } from '../AppConfig/AppConfigStore';
import { AppTableMasterContext } from '../AppTableMaster/AppTableMasterStore';
import { AppFlowContext } from '../AppFlow/AppFlowStore';
import { AppConfig } from '../AppConfig/AppConfig';
import MyCheckBox from '../../app/common/form/MyCheckBox';

interface DetailParms {
  id: string;
}
const AppActionEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppFlowStore = useContext(AppFlowContext);  
  const AppActionStore = useContext(AppActionContext);
  const AppStatusListStore = useContext(AppStatusListContext);
  const AppConfigStore = useContext(AppConfigContext);
  const AppTableMasterStore = useContext(AppTableMasterContext);
  
 
  let history = useHistory();
  const [item, setItem] = useState(new AppAction());
  const [loading, setLoading] = useState(true);
  const [fromStatusList, setFromStatusList] = useState<AppStatusList[]>();
  

  const ActionTypeList = [{Id: "Action", Title: 'Action'}, {Id: "Query", Title: 'Query'}, {Id: "FileDownload", Title: 'FileDownload'}];
  
  useEffect(() => {
   
    AppFlowStore.getList();
    AppTableMasterStore.getList();
   
    AppActionStore.loadItem(Number(id));
    if (id) {
      AppActionStore.loadItem(Number(id)).then((val) => {

        AppStatusListStore.getStatusList(Number(val?.TableId));
        val!.InitStatus = val!.InitStatus ? true : false;

        setItem(val as AppAction);   
        setFromStatusList(val?.FromStatusList);
        setLoading(false);   
      });
    } else {
      setItem(new AppAction()); 
      setLoading(false);     
    }
    
  }, [id, AppActionStore, AppActionStore.loadItem]);

  const onItemSubmit = (values: any) => {  
    debugger;
    //return;  
    values.FromStatusList = fromStatusList;
    setLoading(true);
   
    AppActionStore.editItem(values).then((val) => {
	  history.push('/AppActionlist');
      //debugger;
      //setItem(new AppAction(val));
      //setLoading(false);
    });
  };

  const onTableChange = (event: any) => {
    alert(event.target.value as string);
  };

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    <Container component="main" maxWidth="xs">  

      <Formik
          initialValues={item}
          validationSchema={Yup.object({
            Action: Yup.string().required('Title required'),                     
          })}
          onSubmit={onItemSubmit}
        >
          <Form > 
            {item.Id} <br/>                                 
          <FormControlLabel control={<Checkbox checked={item.InitStatus}  />} label="Init Status"            
              onChange={ () => { item.InitStatus = item.InitStatus ? false : true; setItem(item);  }}           
          />
            <MyDropDown value={item.ActionType} label="ActionType" list={ActionTypeList as any} name="ActionType" /> 
            <MyDropDown value={item.FlowId} label="Flow" list={AppFlowStore.itemList as any} name="FlowId" />  
            <MyDropDown value={item.TableId} label="Table" list={AppTableMasterStore.itemList as any} name="TableId" 
              handleChange={ (event: any) => { 
                debugger;
                item.TableId = Number(event.target.value);
                setItem(item);
                AppStatusListStore.getStatusList(Number(event.target.value));
              }} />

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
                  if( newValue[i].Id == newValue[newValue.length-1].Id){
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
              <Button onClick={ () => { history.push('/AppActionlist');  }}>Back</Button>          
            </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppActionEdit);

