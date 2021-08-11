
import { Button, ButtonGroup, Container, FormControl, LinearProgress, TextField, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { ActionConfig, ApiContext, AppStatusList, AppUserRoleMaster } from '../Api/Api'
import { Employee } from './Employee';
import ErrorMessage from '../../app/common/common/ErrorMessage';
import ConfigDropDown from '../../app/common/form/ConfigDropDown';
import MyCheckBox from '../../app/common/form/MyCheckBox';
import RoleSelect from '../../app/common/form/RoleSelect';
import UserSelect from '../../app/common/form/UserSelect';
import MyDatePicker from '../../app/common/form/MyDatePicker';
import MyAttachment from '../../app/common/form/MyAttachment';
import MyCurrencyInput from '../../app/common/form/MyCurrencyInput';


interface DetailParms {
    id: string;
}

const EmployeeEdit: React.FC = () => {
    const [selectedDate, handleDateChange] = useState(new Date());

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
        ApiStore.updateActions(IdVal,'', '', setActions, setError);
      
        ApiStore.getRoleList().then( resRoles => {
          setRoleList(resRoles);        
          
          if(id){            
            ApiStore.LoadItem("ActionConfig.EmployeeById",id, setActions, setError).then( res => {              
              if(res){
                //debugger;
  
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
        // Object.keys(values).forEach(function(key,index) {     
            
        //     var v = values[key];
        //     type Data = typeof v;
        //     console.log(typeof v);
        //     //console.log(Data.na);
        //     if(v === "Attachment[]"){
        //         console.log(v);
        //     }
        //     if(v === "string"){
        //         console.log(v);
        //     }
        //     // if( colMap.get(key) && values[key] ){        
        //     //     dataParm[ colMap.get(key) as string ] =  values[key] ;
        //     // }      
        // });  

        // return;

        //values.UserAccessRoles = roles;
        
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

    const onTextChange = (event: any) => {
        debugger;
        alert(1);
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
               // Name: Yup.string().required('First Name required'),                     
             })}
          onSubmit={onItemSubmit}
        >
            
            <Form >

           
                <MyCheckBox name="IsActive" label="Is Active"  />
                <MyCustomTxt name="Name" label="Name" type="text" required={true} width="300px"  />
                <MyDatePicker name="DOB" label="DOB" required={false} width="300px" />
                <ConfigDropDown configType="Countries" name="Country" label="Country" width="300px" /> 
                {/* <MyCustomTxt name="Salary" label="Salary1" type="number" required={false} width="300px"  onChange={onTextChange}/>  */}
                <MyCurrencyInput name="Salary" label="Salary"  width="300px" CurrecySymbol="AED" />               
                <UserSelect name="Manager" label="Manager" width="300px"  />
                <RoleSelect name="Roles" label="Roles" width="300px" multiple={true} />

                <MyAttachment downloadActionID={ActionConfig.EmployeePassportDownload} multipleFile={false} name="Passport" label="Upload Passport"  />


                {/* <TextField      
                   name="Name" label="Name" type="text" required={false} 
                    onChange={onTextChange}    
                />   */}
               
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