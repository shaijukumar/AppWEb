import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppApiAction, Customer } from './AppApi';
import { AppApiContext } from './AppApiStore';
import { observer } from 'mobx-react-lite';
import { AppStatusListContext } from '../AppStatusList/AppStatusListStore';
 
interface DetailParms {
  id: string;
}
const AppApiEdit: React.FC = () => {

  const FlowId = 1;
  const { id } = useParams<DetailParms>();
  const AppStatusListStore = useContext(AppStatusListContext);
  const AppApiStore = useContext(AppApiContext);
 
  let history = useHistory();
  const [error, setError] = useState('');
  const [actionId, setActionId] = useState(0);
  const [item, setItem] = useState(new Customer());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    debugger;     
    AppStatusListStore.getList();


    var IdVal =0;
    if (id) { IdVal=Number(id); }
    AppApiStore.getActions(FlowId,IdVal).then( (res) => { 
      debugger;
        if((res as any).errors){          
          setError( error + ", " + (res as any).errors.Error);         
          return;
        }
    });

    if(id){
      setLoading(true);
      let act: AppApiAction = new AppApiAction()
      act.ActionId = 10;  
      act.ItemId = Number(id);
      act.Parm1 = id;
      //act.ReturnFlow = id ? 'update' : 'create';

      AppApiStore.ExecuteAction(act).then( (res) => {      
        debugger;
        if((res as any).errors){          
          setError((res as any).errors.Error);         
          return;
        }
        else{                 
          setItem(res.Result1[0]);
        }  
        setLoading(false);
      });
    }
    else{
      setItem(new Customer()); 
      setLoading(false);
    }
  }, [id, AppApiStore.ExecuteAction , AppApiStore.getActions]);



  const onItemSubmit = (values: any) => {    
    
    
    let colMap = new Map([
      ["Id", "Id"], 
      ["CustomerName", "Txt1"], 
      ["CIF", "Num1"]
    ]);  

    interface LooseObject {
      [key: string]: any
    }
    var dataParm: LooseObject = {};    
    Object.keys(values).forEach(function(key,index) {          
      if( colMap.get(key) && values[key] ){        
        dataParm[ colMap.get(key) as string ] =  values[key] ;
      }      
    });

    debugger;
    let act: AppApiAction = new AppApiAction()
    act.ActionId = actionId;
    //act.Parm1 = JSON.stringify(dataParm );
    act.Parm1 = JSON.stringify(values );
    act.ItemId = values.Id; //Number(id);

    AppApiStore.ExecuteAction(act).then( (res) => {      
      debugger;

      if((res as any).errors){
        setError((res as any).errors.Error);
        setLoading(false);
        return;
      }
      else{
        history.push('/AppApilist');
      }
    });
  };

  const deleteItem = () => {  
   
  }

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    
    <Container component="main" maxWidth="xs">        
      {error && <div  style={{ color:'red' , fontWeight:'bold', padding:5 , border: '1px solid green', margin:10 }} >{error}</div>}     
    

      <Formik
          initialValues={item}

          validationSchema={Yup.object({
            CustomerName: Yup.string().required('Title required'),                     
          })}
          onSubmit={onItemSubmit}
        >
          <Form > 
            Status : { AppStatusListStore.itemList.find( s => s.Id == item.StatusId )?.Title }
            <MyCustomTxt   
              name="CustomerName"                         
              type="text"                
              autoFocus={true}
              required={true}                                
              label="CustomerName"                                                                     
            />
              
            <MyCustomTxt   
              name="CIF"                         
              type="number"                
              required={true}                                
              label="CIF"                                                                     
            />
                           
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">

                { AppApiStore.actionList.map( (row) => (
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    key={row.Id}
                    onClick={ () => { setActionId( row.Id); }}
                  >
                    {row.Action}
                  </Button> 
                ))}
                
                {/* { item.Id && 
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"                    
                    onClick={ () => {

                      let act: AppApiAction = new AppApiAction()
                      act.ActionId = 11;
                      act.Parm1 = item.Id.toString();
                      AppApiStore.ExecuteAction(act).then( (res) => {      
                        history.push('/AppApilist');    
                      });                      
                    }}
                  >
                    Delete
                  </Button>
                } */}
                <Button onClick={ () => { history.push('/AppApilist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    
      
    </Container>
  );
};

export default observer(AppApiEdit);

