import { Button, ButtonGroup, Chip, Container, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppNavigation } from './Navigation';
import { ActionConfig, ApiContext,  AppStatusList, AppUserRoleMaster } from '../Api/Api'
import { Autocomplete } from '@material-ui/lab';

 

interface DetailParms {
    id: string;
}

const NavigationEdit: React.FC = () => { 
      
    const { id } = useParams<DetailParms>();
    let history = useHistory();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(new AppNavigation());
    const [actionId, setActionId] = useState(0);
    const [actions, setActions] = useState<AppStatusList[]>();
    const [roleList, setRoleList] = useState<AppUserRoleMaster[]>();
    const [roles, setRoles] = useState<AppUserRoleMaster[]>();
    const ApiStore = useContext(ApiContext);

    

    useEffect(() => {
        var IdVal =0;
        if (id) { IdVal=Number(id); }

        setLoading(true);
        ApiStore.updateActions(IdVal,'Navigation','NavigationFlow', setActions, setError);
      
        ApiStore.getRoleList().then( resRoles => {
          setRoleList(resRoles);        
          
          if(id){            
            ApiStore.LoadItem("NavigationNavigationById",id, setActions, setError).then( res => {              
              if(res){
                setItem(res);
                var roleArray = ApiStore.rolesFromArray(resRoles as any, res.UserAccessRoles as any);                    
                setRoles(roleArray);                                            
              }
              setLoading(false);   
            });              
          }
          else{ 
              setItem(new AppNavigation()); 
              setLoading(false);
          }
        });

    },[id, ApiStore, ApiStore.updateActions, , ApiStore.getRoleList, ApiStore.LoadItem, setRoles, setItem, ApiStore.rolesFromArray ]);

    const onItemSubmit = (values: any) => {
        
        values.UserAccessRoles = roles;
        let formData = new FormData();
        formData.append('ActionId', actionId.toString() ); 
        formData.append('Parm1', JSON.stringify(values) );
        formData.append('ItemId',  values.Id );

        ApiStore.ExecuteAction(formData, setError).then( (res) => {            
            if(res){
              history.push('/NavigationList');
            }           
        });
    }

  

    if(loading){
        return <LinearProgress color="secondary"  className="loaderStyle" /> 
    }

    return (    
        <Container component="main" maxWidth="lg">
            {error && <div  style={{ color:'red' , fontWeight:'bold', padding:5 , border: '1px solid green', margin:10 }} >{error}</div>}

            <Formik
                initialValues={item}
                validationSchema={Yup.object({
                    Title: Yup.string().required('Title required'),                     
                })}
                onSubmit={onItemSubmit}>

            <Form>
                <MyCustomTxt name="Order" label="Order" type="Number" autoFocus={true} required={true}  />
                <MyCustomTxt name="Title" label="Title" type="text" required={true}  />
                <MyCustomTxt name="Path" label="Path" type="text" required={true}  />
                <MyCustomTxt name="Icon" label="Icon" type="text" required={true}  />
                {/* <MyCustomTxt name="UserAccessRoles" label="UserAccessRoles" type="text" required={true}  />  */}

               
            {
            <Autocomplete id="UserAccessRoles" className="customFieldMargin" multiple 
                style={{width: '300'}}   
                size="small"  
                value={roles as any}  
                options={roleList as any[]} 
                getOptionLabel={(option:AppUserRoleMaster) => option.Name}                  
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option:any, index) => (
                    roles  && <Chip variant="outlined" label={option.Name} {...getTagProps({ index })} /> 
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Access Groups" placeholder="Access Groups" fullWidth />
                )}
                
                onChange={(event:any, newValue:any) => {
                  //debugger;
                  var unq = true;
                  for(let i=0;i<newValue.length-1;i++){
                    if( newValue[i].Id === newValue[newValue.length-1].Id){
                      unq = false;
                      break;
                    }
                  }
                  if(unq){
                    setRoles(newValue); 
                  }                                          
                }}
              />}


                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    { actions && (actions as any).map( (row:any) => (                    
                    <Button type="submit" fullWidth variant="contained" color="primary" key={row.Id}                         
                        onClick={ () => { setActionId( row.Id); }} > {row.Action}</Button>                     
                    ))}
                    <Button onClick={ () => { history.push('/Navigationlist');  }}>Back</Button>                   
                </ButtonGroup>    

            </Form>
            
            </Formik>

        </Container>
    )
}

export default observer(NavigationEdit);