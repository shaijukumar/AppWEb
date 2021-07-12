import { Button, ButtonGroup, Chip, Container, Grid, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AddRole, AppUserRoleMaster } from './AppUserRoleMaster';
import { AppUserRoleMasterContext } from './AppUserRoleMasterStore';
import { observer } from 'mobx-react-lite';
import { AppUserRoleContext } from '../AppUserRole/AppUserRoleStore';
import { Autocomplete } from '@material-ui/lab';
import { UserManagerContext } from '../user/UserManagerStore';
import { AppUserRole } from '../AppUserRole/AppUserRole';
import TableButton from '../../app/common/form/TableButton';
import MaterialTable from 'material-table';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

interface DetailParms {
  id: string;
}
const AppUserRoleMasterEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppUserRoleMasterStore = useContext(AppUserRoleMasterContext);
  const AppUserRoleStore = useContext(AppUserRoleContext); 
  const UserManagerStore = useContext(UserManagerContext);
     
  
  let history = useHistory();
  const [item, setItem] = useState(new AppUserRoleMaster());  
  const [loading, setLoading] = useState(true);

  const [userRole, setUserRole] = useState(new AppUserRole());
  const [role, setRole] = useState(new AddRole());
  const [error, setError] = useState('');
  
  useEffect(() => {
    
    //AppUserRoleStore.getRoleList(id);
    UserManagerStore.getList();

    //AppUserRoleMasterStore.loadItem(id);
   

    if (id) {
      AppUserRoleMasterStore.loadItem(id).then((val) => {
        setItem(val as any);          
        val?.Name && AppUserRoleMasterStore.roleUserList(val?.Name);                   
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
        //debugger;
        setItem(new AppUserRoleMaster(val));
        setLoading(false);    
        //history.push('/AppUserRoleMasterlist');  
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
              AppUserRoleMasterStore.roleUserList(item.Name).then( () => {
                setLoading(false);
              } ); 
            })}            
          }  />  }  
      },
      
    ];

    const TableActions = [
        {          
          icon: (values: any) => { return <TableButton path="useredit/" label="Add New"  /> },
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event:any) =>{},   
          iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
        },
        {          
            icon: (values: any) => { return <TableButton label="Refresh"  /> },
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event:any) =>{ UserManagerStore.getList();},   
            iconProps: { style: { fontSize: "34px", color: "green", borderRadius:"0%  !important" , backgroundColor:'rosybrown' } },            
          }
      ];
  
  
  return (
    <Container component="main" maxWidth="lg"> 

      {error && <div  style={{ color:'red' , fontWeight:'bold', padding:5 , border: '1px solid green', margin:10 }} >{error}</div>}  

      <Formik
          initialValues={item}
          validationSchema={Yup.object({
            Title: Yup.string().required('Title required'),                     
          })}
          onSubmit={onItemSubmit}
        >
          <Form > 
            {/* { item.Id  && <Chip  color="primary" variant="outlined" label={`Role ID : ${item.Id}`} /> } */}

            <MyCustomTxt   
                name="Name"                         
                type="text"                
                autoFocus={true}
                required={true}                                
                label="Name"                                                                     
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
                {/* { item.Id && 
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"                    
                    onClick={ () => {
                      AppUserRoleMasterStore.deleteItem(item.Id).then( () => {
                        history.push('/AppUserRoleMasterlist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                } */}
                <Button onClick={ () => { history.push('/AppUserRoleMasterlist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>

      
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
                    debugger;                   
                    AppUserRoleMasterStore.roleUserList(item.Name).then( () => {
                      setLoading(false);
                    } );

                  // AppUserRoleStore.getRoleList(id).then( () => {
                  //   setLoading(false);
                  // } );                 
                });
              }
            }
          }
        >
          <Form >          

            <Grid  container spacing={1}>
              <Grid item xs={4}>
                <Autocomplete                                                                  
                  id="UserIdToAdd"
                  options={UserManagerStore.itemList}
                  getOptionLabel={(option) =>  option.Email ? option.DisplayName : '-'}                
                  style={{ width: 300, paddingTop: 20  }}
                  renderInput={(params) => <TextField name="UserId"  {...params} label="User Id" variant="outlined" />}

                  onChange={(event:any, newValue:any) => {
                    var u = new AddRole(); 
                    u.UserName = newValue.Username;
                    u.RoleName = item.Name;
                    setRole(u);              
                    debugger;                     
                  }}
                />   
              </Grid>
              <Grid item xs={4}  style={{paddingTop:'10px'}}> 
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"                  
                  >
                    Add User
                  </Button>                                          
                </ButtonGroup>
              </Grid>
            </Grid>           
                         
              

          </Form>
        </Formik>


        { AppUserRoleMasterStore.userList.length > 0 &&
          <div className={"tabcontainers2"} >        
              <MaterialTable                       
                  title="User List"
                  data={AppUserRoleMasterStore.userList}
                  columns={TableColumns}
                  options={{ search: true, paging: true, filtering: true, pageSize:10,  tableLayout: "auto"
                      // , exportButton: false ,  actionsColumnIndex: -1, toolbarButtonAlignment:"left",                            
                  }}   
                  actions={TableActions}         
              />
          </div>
          }


       

    </Container>
  );
};

export default observer(AppUserRoleMasterEdit);

