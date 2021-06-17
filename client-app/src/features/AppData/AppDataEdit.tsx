import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppData } from './AppData';
import { AppDataContext } from './AppDataStore';
import { observer } from 'mobx-react-lite';

interface DetailParms {
  id: string;
}
const AppDataEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppDataStore = useContext(AppDataContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppData());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppDataStore.loadItem(id);
    if (id) {
      AppDataStore.loadItem(id).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppData()); 
      setLoading(false);     
    }
    
  }, [id, AppDataStore, AppDataStore.loadItem]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    AppDataStore.editItem(values).then((val) => {
	  history.push('/AppDatalist');
      //debugger;
      //setItem(new AppData(val));
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
                      AppDataStore.deleteItem(item.Id).then( () => {
                        history.push('/AppDatalist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppDatalist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppDataEdit);

