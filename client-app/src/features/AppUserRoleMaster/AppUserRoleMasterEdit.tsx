import { Button, ButtonGroup, Chip, Container, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppUserRoleMaster } from './AppUserRoleMaster';
import { AppUserRoleMasterContext } from './AppUserRoleMasterStore';
import { observer } from 'mobx-react-lite';
import { AppUserRoleContext } from '../AppUserRole/AppUserRoleStore';
import { Autocomplete } from '@material-ui/lab';
import { UserManagerContext } from '../user/UserManagerStore';
import { AppUserRole } from '../AppUserRole/AppUserRole';

interface DetailParms {
  id: string;
}
const AppUserRoleMasterEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppUserRoleMasterStore = useContext(AppUserRoleMasterContext);
  const AppUserRoleStore = useContext(AppUserRoleContext); 
  const UserManagerStore = useContext(UserManagerContext);
     
  
  let history = useHistory();
  const [item, setItem] = useState(new AppUserRoleMaster());  
  const [loading, setLoading] = useState(true);

  const [userRole, setUserRole] = useState(new AppUserRole());
  //const [user, setUser] = useState(new UserManager());
  
  useEffect(() => {
    
    AppUserRoleStore.getRoleList(Number(id));
    UserManagerStore.getList();

    AppUserRoleMasterStore.loadItem(Number(id));
    if (id) {
      AppUserRoleMasterStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);                       
        setLoading(false);   
      });
    } else {
      setItem(new AppUserRoleMaster()); 
      setLoading(false);     
    }
    
  }, [id, AppUserRoleMasterStore, AppUserRoleMasterStore.loadItem, AppUserRoleStore.getRoleList]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    AppUserRoleMasterStore.editItem(values).then((val) => {
	  history.push('/AppUserRoleMasterlist');
      //debugger;
      //setItem(new AppUserRoleMaster(val));
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
          <Form > 
            {item.Id}
            <MyCustomTxt   
                name="Title"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="Title"                                                                     
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
                      AppUserRoleMasterStore.deleteItem(item.Id).then( () => {
                        history.push('/AppUserRoleMasterlist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppUserRoleMasterlist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>

        { AppUserRoleStore.roleList.length > 0 && AppUserRoleStore.roleList.map( (row) => ( 
            // <div>{row.UserId}</div> 
              <Chip label={row.UserId} onDelete={ () => {  
                  setLoading(true);
                  AppUserRoleStore.deleteItem(row.Id).then( () => {
                    AppUserRoleStore.getRoleList(Number(id)).then( () => {
                      setLoading(false);
                    } ); 
                  })
               }} />
            ) ) }


        <Formik
          initialValues={userRole}

          validationSchema={Yup.object({
            // UserId: Yup.string().required('UserId required'), 
            // AppUserRoleMasterId: Yup.string().required('AppUserRoleMasterId required'),                    
          })}
          
          onSubmit={
            () => {
              if( userRole.AppUserRoleMasterId && userRole.UserId ){
                setLoading(true);
                AppUserRoleStore.editItem(userRole).then((val) => {
                  AppUserRoleStore.getRoleList(Number(id)).then( () => {
                    setLoading(false);
                  } );                 
                });
              }
            }
          }
        >
          <Form > 
           
         

          <Autocomplete   
                                                               
            id="UserIdToAdd"
            options={UserManagerStore.itemList}
            getOptionLabel={(option) =>  option.Email ? option.DisplayName : '-'}                
            style={{ width: 300, paddingTop: 20  }}
            renderInput={(params) => <TextField name="UserId"  {...params} label="User Id" variant="outlined" />}

            onChange={(event:any, newValue:any) => {
              var u = new AppUserRole(); 
              u.UserId = newValue.Username;
              u.AppUserRoleMasterId = item.Id;
              setUserRole(u);              
              debugger;                     
            }}
          />
        
            {/* <MyCustomTxt   
                name="Title"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="User"                                                                     
              /> */}

              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"                  
                >
                  Add User
                </Button>                                          
              </ButtonGroup>

          </Form>
        </Formik>

    </Container>
  );
};

export default observer(AppUserRoleMasterEdit);

