
import { Button, ButtonGroup, Container, LinearProgress  } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { Employee } from './Employee';


interface DetailParms {
    id: string;
}

const EmployeeEdit: React.FC = () => {

    const FlowId = 5;
    const { id } = useParams<DetailParms>();

    //const AppApiStore = useContext(AppApiContext);
    
    let history = useHistory();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [item, setItem] = useState(new Employee());
    const [actionId, setActionId] = useState(0);

    useEffect(() => {
        setLoading(true); 
        debugger;
        var IdVal =0;
        if (id) {             
            // IdVal=Number(id); 

            // let act: AppApiAction = new AppApiAction()
            // act.ActionId = 21;   
            // act.ItemId = IdVal;
            // act.Parm1 = id.toString();
            // AppApiStore.GetData(act).then( (res) => {  
            //     setItem(res.Result1[0] as any);               
            //     setLoading(false);              
            // }); 

            // let act: AppApiAction = new AppApiAction()
            // act.ActionId = 10;  
            // act.ItemId = Number(id);
            // act.Parm1 = id;

            // let formData = new FormData();
            // formData.append('ActionId', '10' );
            // formData.append('ItemId',  id );
            // formData.append('Parm1',  id );

        }
        else{
            setItem(new Employee()); 
            setLoading(false);
        }
            
        // AppApiStore.getActions(FlowId,IdVal).then( (res) => { 
        //     //debugger;
        //     if((res as any).errors){          
        //         setError( error + ", " + (res as any).errors.Error);         
        //         return;
        //     }
        // });


      
    },[id, error]);

    const onItemSubmit = (values: any) => { 

        // let act: AppApiAction = new AppApiAction()
        // act.ActionId = actionId;
        // let formData = new FormData();
        // formData.append('ActionId', actionId.toString() )
        // formData.append('Parm1', JSON.stringify(values) );
        // formData.append('ItemId',  values.Id );

        // AppApiStore.ExecuteAction(formData).then( (res) => {      
        //     //debugger;      
        //     if((res as any).errors){
        //       setError((res as any).errors.Error);
        //       setLoading(false);
        //       return;
        //     }
        //     else{
        //       history.push('/Employeelist');
        //     }
        //   });
    }

    if(loading){
        return <LinearProgress color="secondary"  className="loaderStyle" /> 
    }

    return(
    
        <Container component="main" maxWidth="lg">  
          {error && <div  style={{ color:'red' , fontWeight:'bold', padding:5 , border: '1px solid green', margin:10 }} >{error}</div>}     
          
          <Formik
            initialValues={item}

            validationSchema={Yup.object({
             FirstName: Yup.string().required('First Name required'),                     
             })}
          onSubmit={onItemSubmit}
        >
           
            <Form >
                {/* Status : { AppStatusListStore.itemList.find( s => s.Id === item.StatusId )?.Title } */}
                FirstName:  {item.FirstName}
                <MyCustomTxt   
                    name="FirstName"                                            
                    type="text"                
                    autoFocus={true}
                    required={true}                                
                    label="FirstName"                                                                     
                />

                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    {/* { AppApiStore.actionList.map( (row) => (                
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
                    ))} */}
                    <Button onClick={ () => { history.push('/Employeelist');  }}>Back</Button>          
                </ButtonGroup>
            </Form>
        
        </Formik>
    
        </Container> 
    )    
  }


  export default observer(EmployeeEdit);