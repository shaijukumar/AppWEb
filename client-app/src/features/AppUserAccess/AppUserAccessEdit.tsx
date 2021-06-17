import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppUserAccess } from './AppUserAccess';
import { AppUserAccessContext } from './AppUserAccessStore';
import { observer } from 'mobx-react-lite';

interface DetailParms {
  id: string;
}
const AppUserAccessEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppUserAccessStore = useContext(AppUserAccessContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppUserAccess());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppUserAccessStore.loadItem(Number(id));
    if (id) {
      AppUserAccessStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppUserAccess()); 
      setLoading(false);     
    }
    
  }, [id, AppUserAccessStore, AppUserAccessStore.loadItem]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    AppUserAccessStore.editItem(values).then((val) => {
	  history.push('/AppUserAccesslist');
      //debugger;
      //setItem(new AppUserAccess(val));
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
            Description: Yup.string().required('Description required'), 
            ActionScript: Yup.string().required('Action Script required'), 
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
                name="Description"                         
                type="text"                
                autoFocus={true}
                required={true}    
                multiline={true}                               
                label="Description"
                width="1000px"                                                                     
            />

            <MyCustomTxt   
                name="ActionScript"                         
                type="text"                
                autoFocus={true}
                required={true}     
                multiline={true}                           
                label="Action Script"                                                                     
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
                      AppUserAccessStore.deleteItem(item.Id).then( () => {
                        history.push('/AppUserAccesslist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppUserAccesslist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppUserAccessEdit);

