import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { _Feature_ } from './_Feature_';
import { _Feature_Context } from './_Feature_Store';
import { observer } from 'mobx-react-lite';
 
interface DetailParms {
  id: string;
} 
const _Feature_Edit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const _Feature_Store = useContext(_Feature_Context);
 
  let history = useHistory();
  const [item, setItem] = useState(new _Feature_());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    _Feature_Store.loadItem(Number(id));
    if (id) {
      _Feature_Store.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new _Feature_()); 
      setLoading(false);     
    }
    
  }, [id, _Feature_Store, _Feature_Store.loadItem]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    _Feature_Store.editItem(values).then((val) => {
	  history.push('/_Feature_list');
      //debugger;
      //setItem(new _Feature_(val));
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
                      _Feature_Store.deleteItem(Number(item.Id)).then( () => {
                        history.push('/_Feature_list');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/_Feature_list');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(_Feature_Edit);
