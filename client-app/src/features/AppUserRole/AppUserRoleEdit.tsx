import { Button, ButtonGroup, Container, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AppUserRole } from './AppUserRole';
import { AppUserRoleContext } from './AppUserRoleStore';
import { observer } from 'mobx-react-lite';
import { UserManagerContext } from '../user/UserManagerStore';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AppUserRoleMasterContext } from '../AppUserRoleMaster/AppUserRoleMasterStore';

interface DetailParms {
  id: string;
}
const AppUserRoleEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppUserRoleStore = useContext(AppUserRoleContext);  
  const UserManagerStore = useContext(UserManagerContext);
  const AppUserRoleMasterStore = useContext(AppUserRoleMasterContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppUserRole());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    UserManagerStore.getList();
    AppUserRoleMasterStore.getList();

    AppUserRoleStore.loadItem(Number(id));
    if (id) {
      AppUserRoleStore.loadItem(Number(id)).then((val) => {        
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppUserRole()); 
      setLoading(false);     
    }
    
  }, [id, AppUserRoleStore, AppUserRoleStore.loadItem, AppUserRoleMasterStore, UserManagerStore]);

  const onItemSubmit = (values: any) => {    
    debugger;
    setLoading(true);
    AppUserRoleStore.editItem(values).then((val) => {
	  history.push('/AppUserRolelist');
      //debugger;
      //setItem(new AppUserRole(val));
      //setLoading(false);
    });
  };

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    <Container component="main" maxWidth="xs">  

      <h3>User Role</h3>
      <Formik
          initialValues={item}
          validationSchema={Yup.object({
            UserId: Yup.string().required('Title required'),                     
          })}
          onSubmit={onItemSubmit}
        >
          <Form > 
            {item.Id}
            {/* <MyCustomTxt   
                name="UserId"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="UserId"                                                                     
            /> */}

            <Autocomplete                             
                value={ UserManagerStore.itemList.find( u => u.Username === item.UserId ) } 
                id="UserId"
                options={UserManagerStore.itemList}
                getOptionLabel={(option) => option.Email ? option.DisplayName : '-'}                
                style={{ width: 300, paddingTop: 20  }}
                renderInput={(params) => <TextField {...params} label="User Id" variant="outlined" />}

                onChange={(event:any, newValue:any) => {
                  item.UserId=newValue.Username;
                  setItem(item);
                  debugger;                     
                }}
              /> 

              {/* <Autocomplete                
                value={ AppUserRoleMasterStore.itemList.find( u => u.Id === item.AppUserRoleMasterId ) } 
                id="AppUserRoleMasterId"
                options={AppUserRoleMasterStore.itemList}
                getOptionLabel={(option) => option.Title }                
                style={{ width: 300, paddingTop: 20, paddingBottom : 20 }}
                renderInput={(params) => <TextField {...params} label="User Role" variant="outlined" />}

                onChange={(event:any, newValue:any) => {
                  item.AppUserRoleMasterId = newValue.Id;
                  setItem(item);
                  debugger;                     
                }}
              /> */}



            {/* <MyCustomTxt   
                name="AppUserRoleMasterId"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="AppUserRoleMasterId"                                                                     
            />
                */}
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
                      AppUserRoleStore.deleteItem(item.Id).then( () => {
                        history.push('/AppUserRolelist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppUserRolelist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppUserRoleEdit);

