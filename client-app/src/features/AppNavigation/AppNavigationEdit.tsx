import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppNavigation } from './AppNavigation';
import { AppNavigationContext } from './AppNavigationStore';
import { observer } from 'mobx-react-lite';

interface DetailParms {
  id: string;
}
const AppNavigationEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppNavigationStore = useContext(AppNavigationContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppNavigation());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppNavigationStore.loadItem(Number(id));
    if (id) {
      AppNavigationStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppNavigation()); 
      setLoading(false);     
    }
    
  }, [id, AppNavigationStore, AppNavigationStore.loadItem]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
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
          <Form > 
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

            <MyCustomTxt   
              name="Access"                         
              type="number"                                                          
              label="Access"                                                                     
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

