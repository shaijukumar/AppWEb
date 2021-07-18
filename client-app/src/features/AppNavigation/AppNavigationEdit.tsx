import { Button, ButtonGroup, Container, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppNavigation } from './AppNavigation';
import { AppNavigationContext } from './AppNavigationStore';
import { observer } from 'mobx-react-lite';
import { AppUserRoleMasterContext } from '../AppUserRoleMaster/AppUserRoleMasterStore';
import { Autocomplete } from '@material-ui/lab';

interface DetailParms {
  id: string;
}
const AppNavigationEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppNavigationStore = useContext(AppNavigationContext);
  const AppUserRoleMasterStore = useContext(AppUserRoleMasterContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppNavigation());
  const [group, setGroup] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    AppUserRoleMasterStore.getList();
    AppNavigationStore.loadItem(Number(id));
    if (id) {
      AppNavigationStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);    
        setGroup((val as any).RoleId as any); 
        setLoading(false);   
      });
    } else {
      setItem(new AppNavigation()); 
      setLoading(false);     
    }
    
  }, [id, AppNavigationStore, AppNavigationStore.loadItem,AppUserRoleMasterStore, AppUserRoleMasterStore.getList]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    values.RoleId = group;
    AppNavigationStore.editItem(values).then((val) => {
	  history.push('/AppNavigationlist');
      //debugger;
      //setItem(new AppNavigation(val));
      //setLoading(false);
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
          <Form> 
            {item.Id}
            <MyCustomTxt   
              name="Title"                         
              type="text"                
              autoFocus={true}
              required={true}                                
              label="Title"                                                                     
            />

            <MyCustomTxt   
              name="Path"                         
              type="text"                
              required={true}                                
              label="Path"                                                                     
            />

            <MyCustomTxt   
              name="Icon"                         
              type="text"                
              required={true}                                
              label="Icon"                                                                     
            />

            <Autocomplete    

              id="RoleId"
              size="small"
              value={ AppUserRoleMasterStore.itemList.find( u => u.Id === group ) } 
              options={AppUserRoleMasterStore.itemList}
              getOptionLabel={(option) =>  option.Name}                
              style={{ width: 400, paddingBottom:'10px'  }}
              renderInput={(params) => <TextField name="Group"  {...params} label="User Id" variant="outlined" />}

              onChange={(event:any, newValue:any) => {
                setGroup(newValue.Id);                    
              }}
            /> 

            {/* <MyCustomTxt   
              name="Access"                         
              type="number"                                                          
              label="Access"                                                                     
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
                { item.Id && 
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"                    
                    onClick={ () => {
                      AppNavigationStore.deleteItem(Number(item.Id)).then( () => {
                        history.push('/AppNavigationlist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppNavigationlist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppNavigationEdit);

