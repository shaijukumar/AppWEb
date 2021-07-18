import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppColumnMaster } from './AppColumnMaster';
import { AppColumnMasterContext } from './AppColumnMasterStore';
import { observer } from 'mobx-react-lite';

interface DetailParms {
  id: string;
}
const AppColumnMasterEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppColumnMasterStore = useContext(AppColumnMasterContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppColumnMaster());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppColumnMasterStore.loadItem(Number(id));
    if (id) {
      AppColumnMasterStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppColumnMaster()); 
      setLoading(false);     
    }
    
  }, [id, AppColumnMasterStore, AppColumnMasterStore.loadItem]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    AppColumnMasterStore.editItem(values).then((val) => {
      debugger;
      setItem(new AppColumnMaster(val));
      setLoading(false);
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
                name="Order"                         
                type="number"                
                autoFocus={true}
                required={true}                                
                label="Order"                                                                     
            />

            <MyCustomTxt   
                name="Title"                         
                type="text"                
                required={true}                                
                label="Title"                                                                     
            />

            <MyCustomTxt   
                name="TableID"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="Table ID"                                                                     
            />

            <MyCustomTxt   
                name="Type"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="Type"                                                                     
            />            
            <MyCustomTxt   
                name="UserAccess"                         
                type="text"                
                autoFocus={true}
                required={false}   
                multiline={true}                             
                label="User Access"                                                                     
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
                      AppColumnMasterStore.deleteItem(item.Id).then( () => {
                        history.push('/AppColumnMasterlist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppColumnMasterlist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppColumnMasterEdit);

