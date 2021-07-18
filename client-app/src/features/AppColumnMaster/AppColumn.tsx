import { Button, ButtonGroup, Container, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppColumnMaster } from './AppColumnMaster';
import { AppColumnMasterContext } from './AppColumnMasterStore';
import { observer } from 'mobx-react-lite';
import { ColumnAttachmentType, ColumnDataType, SystemConstant } from '../../app/common/SystemConstants';
import { Autocomplete } from '@material-ui/lab';
import { AppConfigTypeContext } from '../AppConfigType/AppConfigTypeStore';
import { AppConfigType } from '../AppConfigType/AppConfigType';

type CustomProps = {  initVal : AppColumnMaster, parentRefresh : any } ;

const AppColumn: React.FC<CustomProps> = ({initVal, parentRefresh}) => {   

  const AppColumnMasterStore = useContext(AppColumnMasterContext);
  const AppConfigTypeStore = useContext(AppConfigTypeContext);

  const [item] = useState(initVal);
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState(initVal.Type);
  const [configId, setConfigId] = useState(initVal.ConfigId);
  const [attachmentConfig, setAttachmentConfig] = useState(initVal.AttachmentConfig);
  const [error, setError] = useState('');

  useEffect(() => {
    AppConfigTypeStore.getList();
  }, [AppConfigTypeStore, AppConfigTypeStore.getList]);
  
  const onItemSubmit = (values: any) => { 
    debugger;      
    setLoading(true);
    values.Type = type;
    values.ConfigId = configId
    values.AttachmentConfig = attachmentConfig

    AppColumnMasterStore.editItem(values).then((val) => {
      debugger;
      if((val as any).errors){
        setError((val as any).errors.Error);   
        setLoading(false);                                                                          
      }   
      else if((val as any).name === 'Error') {
        setError((val as any).message );   
        setLoading(false);  
      }
      else{
        parentRefresh();
        setLoading(false);
      }           
    });
  };

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    <Container component="main" maxWidth="xs">  
      
      {error && <div  style={{ color:'red' , fontWeight:'bold', padding:5 , border: '1px solid green', margin:10 }} >{error}</div>}

      <Formik
          initialValues={item}
          validationSchema={Yup.object({
            Title: Yup.string().required('Title required'),                     
          })}
          onSubmit={onItemSubmit}
        >
          <Form > 
            {item.Id}
            <MyCustomTxt   
                name="Order"                         
                type="number"                
                autoFocus={true}
                required={true}                                
                label="Order"                                                                     
            />
            
            <MyCustomTxt   
                name="Title"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="Title"                                                                     
            />
            
            <Autocomplete                
              value={ ColumnDataType.find( u => u.Id === item.Type ) } 
              id="Type"              
              options={ColumnDataType}
              getOptionLabel={(option:SystemConstant) => option.value }                
              style={{ width: 300, paddingTop: 20, paddingBottom : 20 }}
              renderInput={(params:any) => <TextField {...params} label="Type" variant="outlined" />}

              onChange={(event:any, newValue:any) => {   
                setType(newValue.Id);         
                //debugger;                     
              }}
            />
            { type === '6' &&
            <Autocomplete                
              value={ AppConfigTypeStore.itemList.find( u => u.Id === item.ConfigId ) } 
              id="ConfigId"              
              options={AppConfigTypeStore.itemList}
              getOptionLabel={(option:AppConfigType) => option.Title }                
              style={{ width: 300, paddingTop: 20, paddingBottom : 20 }}
              renderInput={(params:any) => <TextField {...params} label="Config Type" variant="outlined" />}

              onChange={(event:any, newValue:any) => {   
                setConfigId(Number(newValue.Id));         
                //debugger;                     
              }}
            />
            }

            { type === '7' &&
            <Autocomplete                
              value={ ColumnAttachmentType.find( u => u.Id === item.AttachmentConfig.toString() ) } 
              id="AttachmentConfig"              
              options={ColumnAttachmentType}
              getOptionLabel={(option:SystemConstant) => option.value }                
              style={{ width: 300, paddingTop: 20, paddingBottom : 20 }}
              renderInput={(params:any) => <TextField {...params} label="Attachment Type" variant="outlined" />}

              onChange={(event:any, newValue:any) => {   
                setAttachmentConfig( Number(newValue.Id));         
                //debugger;                     
              }}
            />
            }

            {/* <MyCustomTxt   
                name="UserAccess"                         
                type="text"                
                autoFocus={true}
                required={false}   
                multiline={true}                             
                label="User Access"                                                                     
            /> */}
                           
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"                  
                >
                  Save
                </Button> 
                { initVal.Id && 
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"                    
                    onClick={ () => {
                      AppColumnMasterStore.deleteItem(initVal.Id).then( () => {
                        //history.push('/AppColumnMasterlist');
                        parentRefresh();
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { parentRefresh();  }}>Close</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppColumn);

