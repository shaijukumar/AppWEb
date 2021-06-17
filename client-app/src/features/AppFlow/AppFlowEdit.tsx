import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppFlow } from './AppFlow';
import { AppFlowContext } from './AppFlowStore';
import { observer } from 'mobx-react-lite';

interface DetailParms {
  id: string;
}
const AppFlowEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppFlowStore = useContext(AppFlowContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppFlow());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppFlowStore.loadItem(Number(id));
    if (id) {
      AppFlowStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppFlow()); 
      setLoading(false);     
    }
    
  }, [id, AppFlowStore, AppFlowStore.loadItem]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    AppFlowStore.editItem(values).then((val) => {
	  history.push('/AppFlowlist');
      //debugger;
      //setItem(new AppFlow(val));
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
                      AppFlowStore.deleteItem(Number(item.Id)).then( () => {
                        history.push('/AppFlowlist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppFlowlist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppFlowEdit);

