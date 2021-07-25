
import { Button, ButtonGroup, Checkbox, Chip, Container, FormControlLabel, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { ActionConfig, ApiContext,  AppConfig,  AppStatusList, AppUserRoleMaster } from '../Api/Api'
import { Autocomplete } from '@material-ui/lab';
import { Employee } from './Employee';
import ErrorMessage from '../../app/common/common/ErrorMessage';
import ConfigDropDown from '../../app/common/form/ConfigDropDown';
import MyCheckBox from '../../app/common/form/MyCheckBox';


interface DetailParms {
    id: string;
}

const EmployeeEdit: React.FC = () => {

    const { id } = useParams<DetailParms>();
    let history = useHistory();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(new Employee());
    const [actionId, setActionId] = useState(0);
    const [actions, setActions] = useState<AppStatusList[]>();
    const [roleList, setRoleList] = useState<AppUserRoleMaster[]>();
    
    const [roles, setRoles] = useState<AppUserRoleMaster[]>();

    const ApiStore = useContext(ApiContext);


    useEffect(() => {
        var IdVal =0;
        if (id) { IdVal=Number(id); }

        setLoading(true);
        ApiStore.updateActions(ActionConfig.NavigationFlowId, IdVal, setActions, setError);
      
        ApiStore.getRoleList().then( resRoles => {
          setRoleList(resRoles);        
          
          if(id){            
            ApiStore.LoadItem(ActionConfig.NavigationById,id, setError).then( res => {              
              if(res){
                setItem(res);
                var roleArray = ApiStore.rolesFromArray(resRoles as any, res.UserAccessRoles as any);                    
                setRoles(roleArray);                                            
              }
              setLoading(false);   
            });              
          }
          else{ 
              setItem(new Employee()); 
              setLoading(false);
          }
        });

    },[id, ApiStore, ApiStore.updateActions, , ApiStore.getRoleList, ApiStore.LoadItem, setRoles, setItem, ApiStore.rolesFromArray, ApiStore.getConfigList ]);

    const onItemSubmit = (values: any) => {

        debugger;
        return;

        values.UserAccessRoles = roles;
        let formData = new FormData();
        formData.append('ActionId', actionId.toString() ); 
        formData.append('Parm1', JSON.stringify(values) );
        formData.append('ItemId',  values.Id );

        ApiStore.ExecuteAction(formData, setError).then( (res) => {            
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
                Name: Yup.string().required('First Name required'),                     
             })}
          onSubmit={onItemSubmit}
        >
           
            <Form >

           
                <MyCheckBox name="IsActive" label="Is Active"  />
                <MyCustomTxt name="Name" label="Name" type="text" required={true} width="300px" />
                <MyCustomTxt name="DOB" label="DOB" type="date" required={true} width="300px"/>
                <ConfigDropDown configId={ActionConfig.ConfigCountries} name="Country" label="Country" width="300px" /> 
                <MyCustomTxt name="Salary" label="Salary" type="number" required={true} width="300px" />

                            
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    { actions && (actions as any).map( (row:any) => (                    
                    <Button type="submit" fullWidth variant="contained" color="primary" key={row.Id}                         
                        onClick={ () => { setActionId( row.Id); }} > {row.Action}</Button>                     
                    ))}
                    <Button onClick={ () => { history.push('/Employeelist');  }}>Back</Button>                   
                </ButtonGroup>

            </Form>
        
        </Formik>
    
        </Container> 
    )    
  }


  export default observer(EmployeeEdit);