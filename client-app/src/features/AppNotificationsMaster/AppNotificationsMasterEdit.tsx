import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppNotificationsMaster } from './AppNotificationsMaster';
import { AppNotificationsMasterContext } from './AppNotificationsMasterStore';
import { observer } from 'mobx-react-lite';

interface DetailParms {
  id: string;
}
const AppNotificationsMasterEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppNotificationsMasterStore = useContext(AppNotificationsMasterContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppNotificationsMaster());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppNotificationsMasterStore.loadItem(Number(id));
    if (id) {
      AppNotificationsMasterStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppNotificationsMaster()); 
      setLoading(false);     
    }
    
  }, [id, AppNotificationsMasterStore, AppNotificationsMasterStore.loadItem]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    AppNotificationsMasterStore.editItem(values).then((val) => {
	  history.push('/AppNotificationsMasterlist');
      //debugger;
      //setItem(new AppNotificationsMaster(val));
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
                      AppNotificationsMasterStore.deleteItem(Number(item.Id)).then( () => {
                        history.push('/AppNotificationsMasterlist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppNotificationsMasterlist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppNotificationsMasterEdit);

