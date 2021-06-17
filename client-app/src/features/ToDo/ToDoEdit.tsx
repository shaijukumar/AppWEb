import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import {  useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { ToDo } from './ToDo';
import { ToDoContext } from './ToDoStore';
import { observer } from 'mobx-react-lite';


interface DetailParms {
  id: string;
}
const ToDoEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const toDoStore = useContext(ToDoContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new ToDo());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    if (id) {
      toDoStore.loadItem(id).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new ToDo()); 
      setLoading(false);     
    }
    
  }, [id, toDoStore, toDoStore.loadItem]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    toDoStore.editItem(values).then((val) => {
      history.push('/todolist'); 
      // debugger;
      // setItem(new ToDo(val));
      // setLoading(false);
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
                multiline={true}                                                                               
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
                      toDoStore.deleteItem(item.Id).then( () => {
                        history.push('/todolist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/todolist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(ToDoEdit);