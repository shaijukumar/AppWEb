import { Button, ButtonGroup, Container, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppStatusList } from './AppStatusList';
import { AppStatusListContext } from './AppStatusListStore';
import { observer } from 'mobx-react-lite';
import { Autocomplete } from '@material-ui/lab';
import { AppTableMasterContext } from '../AppTableMaster/AppTableMasterStore';

interface DetailParms {
  id: string;
}
const AppStatusListEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppStatusListStore = useContext(AppStatusListContext);
  const AppTableMasterStore = useContext(AppTableMasterContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppStatusList());
  const [table, setTable] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppTableMasterStore.getList();
    AppStatusListStore.loadItem(Number(id));
    if (id) {
      AppStatusListStore.loadItem(Number(id)).then((val) => {
        setItem(val as any); 
        var vl = val!.TableId;  
        setTable(vl);  
        setLoading(false);   
      });
    } else {
      setItem(new AppStatusList()); 
      setLoading(false);     
    }
    
  }, [id, AppStatusListStore, AppStatusListStore.loadItem, AppTableMasterStore]);

  const onItemSubmit = (values: any) => {    
      setLoading(true);
      values.TableId = table;
      AppStatusListStore.editItem(values).then((val) => {
      history.push('/AppStatusListlist');
    });
  };

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    <Container component="main" maxWidth="xs">  
      <h3>Status</h3>
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
              label="Order"                                                                     
            />
            table id : {table}
            <Autocomplete                             
              value={ AppTableMasterStore.itemList.find( u => u.Id === table ) } 
              id="TableId"
              options={AppTableMasterStore.itemList}
              getOptionLabel={(option) => option.Title }                
              style={{ paddingTop: 20  }}
              renderInput={(params) => <TextField {...params} label="Table" variant="outlined" />}

              onChange={(event:any, newValue:any) => {
                if(newValue){
                  if(newValue){
                    setTable(newValue.Id);
                  }                  
                }                
              }}
            /> 

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
                      AppStatusListStore.deleteItem(item.Id).then( () => {
                        history.push('/AppStatusListlist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppStatusListlist');  }}>Back</Button>          
              </ButtonGroup>
          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppStatusListEdit);

