import { Button,  Card,  Container,  LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AddRole, AppUserRoleMaster } from './AppUserRoleMaster';
import { AppUserRoleMasterContext } from './AppUserRoleMasterStore';
import { observer } from 'mobx-react-lite';
import { Autocomplete } from '@material-ui/lab';
import { UserManagerContext } from '../user/UserManagerStore';
import { AppUserRole } from '../AppUserRole/AppUserRole';
import MaterialTable from 'material-table';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

interface DetailParms {
  id: string;
}
const AppUserRoleMasterEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppUserRoleMasterStore = useContext(AppUserRoleMasterContext);
    const UserManagerStore = useContext(UserManagerContext);
     
  
  let history = useHistory();
  const [item, setItem] = useState(new AppUserRoleMaster());  
  const [loading, setLoading] = useState(true);

  const [userRole] = useState(new AppUserRole());
  const [role, setRole] = useState(new AddRole());
  const [error, setError] = useState('');

  const [roleList, setRoleList] = useState<AppUserRole[]>();
  
  useEffect(() => {

    UserManagerStore.getList();
    
    if (id) {
      AppUserRoleMasterStore.loadItem(id).then((val) => {
        setItem(val as any);          
        val?.Name && AppUserRoleMasterStore.roleUserList(val?.Name).then((roles => {
          setRoleList(roles as any);
        }));                   
        setLoading(false);   
      });
    } else {
      setItem(new AppUserRoleMaster()); 
      setLoading(false);     
    }
    
  }, [id, AppUserRoleMasterStore, AppUserRoleMasterStore.loadItem, UserManagerStore, AppUserRoleMasterStore.roleUserList]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    AppUserRoleMasterStore.editItem(values).then((val) => {

      if((val as any).errors){
        setError((val as any).errors.Error);  
        setLoading(false);              
        return;
      }
      else{             
        history.push('/AppUserRoleMasterlist');  
      }
	 
     
    });
  };

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }

    const TableColumns = [
      {
        title: "Display Name",
        field: "DisplayName",                 
        //render :  (values: any) => { return <NavLink to={"/useredit/" + values.Username } >{values.DisplayName}</NavLink> } 
      },
      {
        title: "Username",
        field: "Username",
                
      },
      {
        title: "Email",
        field: "Email",
                
      },
      {
        title: "PhoneNumber",
        field: "PhoneNumber",
                
      },
      {
        title: "Is Active",
        field: "IsActive",   
        render : (values: any) => { return values.IsActive ? "Active" : "Inactive" },
        lookup: { true : "Active", false : "Inactive" },            
      },
      {
        title: "Delete",
        field: "Delete",  
        render : (values: any) => { return <DeleteOutlinedIcon onClick={ () => { 
            setLoading(true);
            var u = new AddRole(); 
            u.UserName = values.Username;
            u.RoleName = item.Name;
            AppUserRoleMasterStore.RemoveUserFromRole(u).then( () => {   
              // AppUserRoleMasterStore.roleUserList(item.Name).then( () => {
              //   setLoading(false);
              // } ); 

              AppUserRoleMasterStore.roleUserList(item.Name).then((roles => {
                setRoleList(roles as any);
                setLoading(false);
              }));  

            })}            
          }  />  }  
      },
      
    ];


  
  
  return (
    <Container component="main" maxWidth="lg"> 

      {error && <div  style={{ color:'red' , fontWeight:'bold', padding:5 , border: '1px solid green', margin:10 }} >{error}</div>}  
      <Card  style={{ margin: '10px', padding: '10px'}}>
      <Formik
          initialValues={item}
          validationSchema={Yup.object({
            Name: Yup.string().required('Title required'),                     
          })}
          onSubmit={onItemSubmit}
        >
          <Form style={{ display:'flex'}}> 
            {/* { item.Id  && <Chip  color="primary" variant="outlined" label={`Role ID : ${item.Id}`} /> } */}

            <MyCustomTxt   
                name="Name"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="Name"
                width={'300px'}  
               
                                                                                  
              />

              <Button type="submit" variant="contained" size="large" color="primary"  style={{  marginLeft:'25px', width: '100px', height: '100%', marginTop:'13px'}}>Save</Button> 
              <Button variant="contained" size="large" color="primary"  style={{  marginLeft:'25px', width: '100px', height: '100%', marginTop:'13px'}} onClick={ () => { history.push('/AppUserRoleMasterList');  }}>Back</Button>             
              {/* <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" size="small">
                <Button type="submit" fullWidth variant="contained" color="primary" size="small">Save</Button>                 
                <Button onClick={ () => { history.push('/AppUserRoleMasterlist');  }}>Back</Button>          
              </ButtonGroup> */}

          </Form>
        </Formik>
      </Card>

      {id && 
        <Card  style={{ margin: '10px', padding: '10px'}}>
        <Formik
          initialValues={userRole}
          validationSchema={Yup.object({
            // UserId: Yup.string().required('UserId required'), 
            // AppUserRoleMasterId: Yup.string().required('AppUserRoleMasterId required'),                    
          })}
          
          onSubmit={
            () => {
              if( role.UserName && role.RoleName ){
                debugger;
                setLoading(true);
                AppUserRoleMasterStore.addUserToRole(role).then((val) => {
                                        
                    AppUserRoleMasterStore.roleUserList(item.Name).then((roles => {
                      setRoleList(roles as any);
                      setLoading(false);
                    }));  

                });
              }
            }
          }
        >
          <Form  style={{ display:'flex'}} >          
           

              <Autocomplete                                                                  
                  id="UserIdToAdd"
                  size="small"
                  options={UserManagerStore.itemList}
                  getOptionLabel={(option) =>  option.Email ? option.DisplayName : '-'}                
                  style={{ width: 300  }}
                  renderInput={(params) => <TextField name="UserId"  {...params} label="User Id" variant="outlined" />}

                  onChange={(event:any, newValue:any) => {
                    var u = new AddRole(); 
                    u.UserName = newValue.Username;
                    u.RoleName = item.Name;
                    setRole(u);              
                    debugger;                     
                  }}
                /> 

                <Button type="submit" variant="contained" size="small" color="primary" style={{  marginLeft:'25px', width: '100px'}}> Add User</Button>  
            
          </Form>
        </Formik>
        </Card >
      }

      { roleList &&
      <Card  style={{ margin: '10px', padding: '10px'}}>
      <div className={"tabcontainers2"} >        
          <MaterialTable                       
              title="User List"
              data={roleList as any}
              columns={TableColumns}
              options={{ search: true, paging: true, filtering: true, pageSize:10,  tableLayout: "auto"
                  // , exportButton: false ,  actionsColumnIndex: -1, toolbarButtonAlignment:"left",                            
              }}   
            
          />
      </div>
      </Card>
    }

    </Container>
  );
};

export default observer(AppUserRoleMasterEdit);

