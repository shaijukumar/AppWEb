import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { PageCategory } from './PageCategory';
import { PageCategoryContext } from './PageCategoryStore';
import { observer } from 'mobx-react-lite';
import ContentEditable from 'react-contenteditable'

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import PageCategorySelect from '../../app/common/form/PageCategorySelect';
import PageCategoryItem from '../../app/common/common/PageCategoryItem';


interface DetailParms {
  id: string;
}
const PageCategoryEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const PageCategoryStore = useContext(PageCategoryContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new PageCategory());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    PageCategoryStore.getList();

    PageCategoryStore.loadItem(id);
    if (id) {
      PageCategoryStore.loadItem(id).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new PageCategory()); 
      setLoading(false);     
    }
    
  }, [id, PageCategoryStore, PageCategoryStore.loadItem]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    values.Pid = values.Pid ? values.Pid : "00000000-0000-0000-0000-000000000000";
    PageCategoryStore.editItem(values).then((val) => {
      debugger;
      setItem(new PageCategory(val));
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
                name="Title"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="Title"                                                                     
              />

        

              {/* <MyCustomTxt   
                name="Pid"                         
                type="text"                
                autoFocus={true}
                required={false}                                
                label="Pid"                                                                     
              />              */}

              {/* <FormControl variant="outlined" fullWidth >
                <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
                <Select
                  native
                  fullWidth
                  //value={state.age}
                  //onChange={handleChange}
                  label="Age"
                  inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl> */}

              <PageCategorySelect
                name="Pid"                                                         
                autoFocus={true}
                required={false}                                
                label="Parent" 
                list={PageCategoryStore.itemList}
                parent= {false}
              />

            

              <br/>

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
                      PageCategoryStore.deleteItem(item.Id).then( () => {
                        history.push('/PageCategorylist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/PageCategorylist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(PageCategoryEdit);

