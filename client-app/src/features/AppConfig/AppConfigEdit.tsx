import { Button, ButtonGroup, Container, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppConfig } from './AppConfig';
import { AppConfigContext } from './AppConfigStore';
import { observer } from 'mobx-react-lite';
import { Autocomplete } from '@material-ui/lab';
import { AppConfigTypeContext } from '../AppConfigType/AppConfigTypeStore';


interface DetailParms {
  id: string;
}
const AppConfigEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppConfigTypeStore = useContext(AppConfigTypeContext);
  const AppConfigStore = useContext(AppConfigContext);
 
 
  let history = useHistory();
  const [item, setItem] = useState(new AppConfig());
  const [type, setType] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppConfigTypeStore.getList(); 
    AppConfigStore.loadItem(Number(id));
    if (id) {
      AppConfigStore.loadItem(Number(id)).then((val) => {
        setItem(val as any); 
        var ty = val!.ConfigTypeId;
        setType(ty);    
        setLoading(false);   
      });
    } else {
      setItem(new AppConfig()); 
      setLoading(false);     
    }
    
  }, [id, AppConfigStore, AppConfigStore.loadItem, AppConfigTypeStore]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    values.Type = type;
    
    AppConfigStore.editItem(values).then((val) => {
	    history.push('/AppConfiglist');
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
            Type : {type}
            <Autocomplete                             
              value={ AppConfigTypeStore.itemList.find( u => u.Id === type ) } 
              id="Type"
              options={AppConfigTypeStore.itemList}
              getOptionLabel={(option) => option.Title }                
              style={{ width: 300, paddingTop: 20  }}
              renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}

              onChange={(event:any, newValue:any) => {
                if(newValue){
                  setType(newValue.Id);
                }                
              }}
            />

            <MyCustomTxt   
              name="Order"                         
              type="number"                               
              label="Order"                                                                     
            />

            <MyCustomTxt   
              name="Det1"                         
              type="text"                               
              label="Det1"                                                                     
            />
              <MyCustomTxt   
              name="Det2"                         
              type="text"                                
              label="Det2"                                                                     
            />

            <MyCustomTxt   
              name="Det3"                         
              type="text"                               
              label="Det3"                                                                     
            />
            <MyCustomTxt   
              name="Det4"                         
              type="text"                                                
              label="Det4"                                                                     
            />
            <MyCustomTxt   
              name="Det5"                         
              type="text"                                             
              label="Det5"                                                                     
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
                { item.Id && 
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"                    
                    onClick={ () => {
                      AppConfigStore.deleteItem(item.Id).then( () => {
                        history.push('/AppConfiglist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppConfiglist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>

         

    </Container>
  );
};

export default observer(AppConfigEdit);

