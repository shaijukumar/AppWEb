import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { PageTag } from './PageTag';
import { PageTagContext } from './PageTagStore';
import { observer } from 'mobx-react-lite';

interface DetailParms {
  id: string;
}
const PageTagEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const PageTagStore = useContext(PageTagContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new PageTag());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
debugger;
    PageTagStore.loadItem(id);
    if (id) {
      PageTagStore.loadItem(id).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new PageTag()); 
      setLoading(false);     
    }
    
  }, [id, PageTagStore, PageTagStore.loadItem]);

  const onItemSubmit = (values: any) => {    
    debugger;
    setLoading(true);
    PageTagStore.editItem(values).then((val) => {      
      setItem(new PageTag(val));
      setLoading(false);
      history.push('/PageTaglist');
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
            {item.value}
            <MyCustomTxt   
                name="label"                         
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
                { item.value && 
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"                    
                    onClick={ () => {
                      PageTagStore.deleteItem(item.Id).then( () => {
                        history.push('/PageTaglist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/PageTaglist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(PageTagEdit);

