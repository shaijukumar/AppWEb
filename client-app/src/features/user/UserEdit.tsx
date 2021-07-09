import { Button, ButtonGroup, Checkbox, Container, FormControlLabel, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import {  useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { UserManager } from './UserManager';
import { UserManagerContext } from './UserManagerStore';
import { observer } from 'mobx-react-lite';


interface DetailParms {
  id: string;
}
const UserEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const UserManagerStore = useContext(UserManagerContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new UserManager());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
debugger;
    if (id) {
      UserManagerStore.loadItem(id).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new UserManager()); 
      setLoading(false);          
    }
    
  }, [id, UserManagerStore, UserManagerStore.loadItem]);

  const onItemSubmit = (values: any) => {    

    debugger;
    setLoading(true);
    UserManagerStore.editItem(values, id).then((val) => {
      debugger;
      setItem(new UserManager(val as any));
      setLoading(false);
      history.push('/userlist')
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
            DisplayName: Yup.string().required('DisplayName required'),   
            Username: Yup.string().required('Username required'),     
            Email: Yup.string().required('Email required'),                                    
          })}
          onSubmit={onItemSubmit}
        >
          <Form > 
            
            <MyCustomTxt   
                name="DisplayName"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="Display Name"                                                                     
              />

            <MyCustomTxt   
                name="Username"                         
                type="text"                                
                required={true}                                
                label="User Name"                                                                     
              />

              <MyCustomTxt   
                name="Password"                         
                type="Password"                                
                required={ id ?  false : true}                                
                label="Password"                                                                     
              />

            <MyCustomTxt   
                name="Email"                         
                type="email"                                
                required={true}                                
                label="Email"                                                                                     
              />

            <MyCustomTxt   
                name="PhoneNumber"                         
                type="text"                                
                required={false}                                
                label="Phone Number"                                                                     
              />

            <FormControlLabel
              control={<Checkbox id="IsActive" name="IsActive" checked={item.IsActive} onClick={ () => { item.IsActive = !item.IsActive; setItem(item) } }  />}
              label="IsActive"              
            />
            
            <br/> 

              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"                  
                >
                  Save
                </Button> 
               
                <Button onClick={ () => { history.push('/userlist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(UserEdit);