import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppHistory } from './AppHistory';
import { AppHistoryContext } from './AppHistoryStore';
import { observer } from 'mobx-react-lite';

interface DetailParms {
  id: string;
}
const AppHistoryEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppHistoryStore = useContext(AppHistoryContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppHistory());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppHistoryStore.loadItem(Number(id));
    if (id) {
      AppHistoryStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppHistory()); 
      setLoading(false);     
    }
    
  }, [id, AppHistoryStore, AppHistoryStore.loadItem]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    AppHistoryStore.editItem(values).then((val) => {
	  history.push('/AppHistorylist');
      //debugger;
      //setItem(new AppHistory(val));
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
            Action: Yup.string().required('Action required'),                     
          })}
          onSubmit={onItemSubmit}
        >
          <Form > 
            {item.Id}
            <MyCustomTxt   
                name="Action"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="Action"                                                                     
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
                      AppHistoryStore.deleteItem(item.Id).then( () => {
                        history.push('/AppHistorylist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppHistorylist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppHistoryEdit);

