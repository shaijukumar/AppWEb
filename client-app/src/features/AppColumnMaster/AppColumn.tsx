import { Button, ButtonGroup, Container, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppColumnMaster } from './AppColumnMaster';
import { AppColumnMasterContext } from './AppColumnMasterStore';
import { observer } from 'mobx-react-lite';
import { ColumnDataType, SystemConstant } from '../../app/common/SystemConstants';
import { Autocomplete } from '@material-ui/lab';



type CustomProps = {  initVal : AppColumnMaster, parentRefresh : any } ;

const AppColumn: React.FC<CustomProps> = ({initVal, parentRefresh}) => {   

  const AppColumnMasterStore = useContext(AppColumnMasterContext);

  const [item, setItem] = useState(initVal);
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState(initVal.Type);
  
  const onItemSubmit = (values: any) => { 
    debugger;      
    setLoading(true);
    values.Type = type;
    AppColumnMasterStore.editItem(values).then((val) => {
      debugger;
      parentRefresh();
      setLoading(false);
    });
  };

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    <Container component="main" maxWidth="xs">  

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
                name="Title"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="Title"                                                                     
            />
            
            <Autocomplete                
              value={ ColumnDataType.find( u => u.Id == item.Type ) } 
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


            <MyCustomTxt   
                name="UserAccess"                         
                type="text"                
                autoFocus={true}
                required={false}   
                multiline={true}                             
                label="User Access"                                                                     
            />
                           
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

