import { Button, ButtonGroup, Chip, Container, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppNavigation } from './Navigation';
import { ApiContext, AppApiAction, AppStatusList, AppUserRoleMaster } from '../Api/Api'
import { Autocomplete } from '@material-ui/lab';

 

interface DetailParms {
    id: string;
}

const NavigationEdit: React.FC = () => { 
  
    const FlowId = 11;
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

        

        ApiStore.getActions(FlowId,IdVal).then( (res) => {             
            if((res as any).errors){          
                setError( error + ", " + (res as any).errors.Error);                        
            }
            else{
                setActions(res);
            }                 
        });

        ApiStore.getRoleList().then( resRoles => {
          setRoleList(resRoles);        
          if(id){
              let formData = new FormData();
              formData.append('ActionId', '35' );
              formData.append('ItemId',  id );
              formData.append('Parm1',  id );
              ApiStore.ExecuteAction(formData).then( (res) => {      
                  //debugger;
                  if((res as any).errors){          
                    setError((res as any).errors.Error);         
                    return;
                  }
                  else{
                    debugger;
                    var rl = ApiStore.rolesFromArray(resRoles as any, res.Result1[0].UserAccessRoles);                    
                    setRoles(rl);            
                    setItem(res.Result1[0] as any);        
                  }  
                  //debugger;               
                  setLoading(false);
              });
          }
          else{ 
              setItem(new AppNavigation()); 
              setLoading(false);
          }
        });


    },[ApiStore, ApiStore.getActions, ApiStore, ApiStore.ExecuteAction, setRoles, setItem, ApiStore, ApiStore.rolesFromArray ]);

    const onItemSubmit = (values: any) => {
        
        values.UserAccessRoles = roles;
        let formData = new FormData();
        formData.append('ActionId', actionId.toString() )
        formData.append('Parm1', JSON.stringify(values) );
        formData.append('ItemId',  values.Id );

        ApiStore.ExecuteAction(formData).then( (res) => {            
            if((res as any).errors){
                setError((res as any).errors.Error);
                setLoading(false);
                return;
            }
            else{
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
                    {/* <Button onClick={ () => { 
                        //debugger;
                          setLoading(true);
                          let act: AppApiAction = new AppApiAction()
                          act.ActionId = 36;
                          act.ItemId = item.Id;
                          ApiStore.ExecuteQuery(act).then( (res) => { 
                            //debugger;
                            history.push('/Navigationlist');
                          });
                          
                         } }>Delete</Button> */}
                </ButtonGroup>               
            </Form>

            </Formik>

        </Container>
    )
}

export default observer(NavigationEdit);