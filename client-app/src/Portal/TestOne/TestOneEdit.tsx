
import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { ActionConfig, ApiContext, AppStatusList } from '../Api/Api';
import ErrorMessage from '../../app/common/common/ErrorMessage';
import { TestOne } from './TestOne';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import MyCheckBox from '../../app/common/form/MyCheckBox';
import MyDatePicker from '../../app/common/form/MyDatePicker';
import MyAttachment from '../../app/common/form/MyAttachment';
import ConfigDropDown from '../../app/common/form/ConfigDropDown';
import MyCurrencyInput from '../../app/common/form/MyCurrencyInput';


interface DetailParms {
    id: string;
}

const TestOneEdit: React.FC = () => {
    
    const { id } = useParams<DetailParms>();
    let history = useHistory();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(new TestOne());
    const [actionId, setActionId] = useState(0);
    const [actions, setActions] = useState<AppStatusList[]>();   

    const ApiStore = useContext(ApiContext);


    useEffect(() => {
      debugger;
        var IdVal =0;
        if (id) { IdVal=Number(id); }

        setLoading(true);
              
        ApiStore.getRoleList().then( resRoles => {                     
          if(id){           
            ApiStore.LoadItem("TestOneNavigationById", id, setActions, setError).then( res => {              
              if(res){                  
                setItem(res);                                                                        
              }
              setLoading(false);   
            });              
          }
          else{ 
              ApiStore.updateActions(IdVal, 'TestOne','ActionFlow',setActions, setError);
              setItem(new TestOne()); 
              setLoading(false);
          }
        });

    },[id, ApiStore, ApiStore.updateActions, ApiStore.getRoleList, ApiStore.LoadItem, setItem ]);

    const onItemSubmit = (values: any) => {

        let formData = new FormData();
        formData = ApiStore.updateAttachments(formData, values.Passport); 
       
        formData.append('ActionId', actionId.toString() ); 
        formData.append('Parm1', JSON.stringify(values) );
        formData.append('ItemId',  values.Id );

        ApiStore.ExecuteAction(formData, setError).then( (res) => {    
            debugger;        
            if(res){
              history.push('/EmployeeList');
            }
        });
    }
    
    if(loading){
        return <LinearProgress color="secondary"  className="loaderStyle" /> 
    }

    return(
    
        <Container component="main" maxWidth="lg">  
          <ErrorMessage message={error} />       
          
          <Formik
              initialValues={item}
              validationSchema={Yup.object({
                //Title: Yup.string().required().min(1).label('Title'),
	              Order: Yup.string().required().min(1).label('Order'),	               
              })}
            onSubmit={onItemSubmit}
          > 
            
            <Form >      
                    
                {/* <MyCheckBox name="IsActive" label="Is Active" type="boolean"  />
                <MyCustomTxt name="Name" label="Name" type="text" required={true} width="300px"  />
                <MyDatePicker name="DOB" label="DOB" required={false} width="300px" />
                <ConfigDropDown configId={ActionConfig.ConfigCountries} name="Country" label="Country" width="300px" />                 
                <MyCurrencyInput name="Salary" label="Salary"  width="300px" CurrecySymbol="AED" />                              
                <MyAttachment downloadActionID={ActionConfig.EmployeePassportDownload} multipleFile={false} name="Passport" label="Upload Passport"  /> */}
                
								<MyCustomTxt name='Title' label='Title' required={true} type="text" autoFocus={true} />
								<MyCustomTxt name='Order' label='Order' required={true} type="number" />
								<MyCheckBox name='IsActive' label='IsActive'   />
								<MyDatePicker name='DOB' label='DOB'   />
								<MyAttachment name='Document' label='Add New Document'  downloadActionID={ActionConfig.EmployeePassportDownload} />
								<ConfigDropDown name='Country' label='Country' configType="Countries" />
								<MyCurrencyInput name='Salary' label='Salary'   CurrecySymbol="AED"  />
               
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    { actions && (actions as any).map( (row:any) => (                    
                    <Button type="submit" fullWidth variant="contained" color="primary" key={row.Id}                         
                        onClick={ () => { setActionId( row.Id); }} > {row.Action}</Button>                     
                    ))}
                    <Button onClick={ () => { history.push('/TestOneList');  }}>Back</Button>                   
                </ButtonGroup>
            </Form>                
        </Formik>            
        </Container> 
    )    
  }
  export default observer(TestOneEdit);
