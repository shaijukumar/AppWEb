import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppNotifications } from './AppNotifications';
import { AppNotificationsContext } from './AppNotificationsStore';
import { observer } from 'mobx-react-lite';

interface DetailParms {
  id: string;
}
const AppNotificationsEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppNotificationsStore = useContext(AppNotificationsContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppNotifications());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppNotificationsStore.loadItem(Number(id));
    if (id) {
      AppNotificationsStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppNotifications()); 
      setLoading(false);     
    }
    
  }, [id, AppNotificationsStore, AppNotificationsStore.loadItem]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    AppNotificationsStore.editItem(values).then((val) => {
	  history.push('/AppNotificationslist');
      //debugger;
      //setItem(new AppNotifications(val));
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
                      AppNotificationsStore.deleteItem(Number(item.Id)).then( () => {
                        history.push('/AppNotificationslist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppNotificationslist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppNotificationsEdit);

