import { Button, ButtonGroup, Chip, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppConfig } from './AppConfig';
import { AppConfigContext } from './AppConfigStore';
import { observer } from 'mobx-react-lite';
import { AppConfigTypeContext } from '../AppConfigType/AppConfigTypeStore';


interface DetailParms {
  typeid: string;
  id: string; 
}
const AppConfigEdit: React.FC = () => {

  const { id, typeid } = useParams<DetailParms>();
  const AppConfigTypeStore = useContext(AppConfigTypeContext);
  const AppConfigStore = useContext(AppConfigContext);
 
 
  let history = useHistory();
  const [item, setItem] = useState(new AppConfig());
  const [type, setType] = useState(Number(typeid));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
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
      setType(Number(typeid));
      setLoading(false);     
    }
    
  }, [id, typeid, AppConfigStore, AppConfigStore.loadItem, AppConfigTypeStore]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    values.Type = type;
    
    AppConfigStore.editItem(values).then((val) => {
      debugger;
      if((val as any).errors){
        setError((val as any).errors.Error);  
        setLoading(false);              
        return;
      }
      else{
        history.push(`/AppConfigTypeItemEdit/${typeid}`);
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
           
            {type && 
              <Chip label={ `Type : ${AppConfigTypeStore.itemList.find( u => u.Id === type )?.Title }` }  color="primary"  />
            }

            {/* { !type && 
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
            /> } */}

            <MyCustomTxt   
              name="Title"                         
              type="text"                
              autoFocus={true}
              required={true}                                
              label="Title"                                                                     
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
                        history.push(`/AppConfigTypeItemEdit/${typeid}`);
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push(`/AppConfigTypeItemEdit/${typeid}`);  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>

         

    </Container>
  );
};

export default observer(AppConfigEdit);

