import { Button, ButtonGroup, Container, LinearProgress, Link, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppConfigType } from './AppConfigType';
import { AppConfigTypeContext } from './AppConfigTypeStore';
import { observer } from 'mobx-react-lite';
import { AppConfigContext } from '../AppConfig/AppConfigStore';

interface DetailParms {
  id: string;
}
const AppConfigTypeEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppConfigTypeStore = useContext(AppConfigTypeContext);
  const AppConfigStore = useContext(AppConfigContext);  
 
  let history = useHistory();
  const [item, setItem] = useState(new AppConfigType());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppConfigTypeStore.loadItem(Number(id));
    if (id) {
      AppConfigStore.getConfigList(Number(id)); 
      AppConfigTypeStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppConfigType()); 
      setLoading(false);     
    }
    
  }, [id, AppConfigTypeStore, AppConfigTypeStore.loadItem, AppConfigStore]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    AppConfigTypeStore.editItem(values).then((val) => {
	  history.push('/AppConfigTypelist');
      //debugger;
      //setItem(new AppConfigType(val));
      //setLoading(false);
    });
  };

  const openModel = (col: AppConfigType) => {  
    // if(!col.TableID){
    //   col.TableID = item.Id;
    // }
    // setSelectedColumn(col);
    // setOpen(true);
  };

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    <Container component="main" maxWidth="xs">  

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
                      AppConfigTypeStore.deleteItem(item.Id).then( () => {
                        history.push('/AppConfigTypelist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppConfigTypelist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>


        <List>
          <ListItem divider>
            <h5>Config List</h5>  
          </ListItem>
          
           
          <ListItem divider>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order</TableCell>
                    <TableCell align="left">Title</TableCell>
                    {/* <TableCell align="left">Type</TableCell>
                    <TableCell align="left">User Access</TableCell>
                    <TableCell align="left">Delete</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  { AppConfigStore.AppConfigList.map((row) => (
                    <TableRow key={row.Id} >
                      {/* <TableCell component="th" scope="row"  >
                        <NavLink to={"/AppColumnMasterItemEdit/" + row.Id } >{row.Id}</NavLink> 
                      </TableCell> */}
                      <TableCell align="left" width="50">{row.Order}</TableCell>                          
                      <TableCell align="left"  >
                        {/* <Link href="#" onClick={ () => { openModel( row as any ) } } >{row.Title}</Link> */}
                        <NavLink to={`/AppConfigItemEdit/${item.Id}/${row.Id}` } >{row.Title}</NavLink>
                      </TableCell>  
                      {/* <TableCell align="left"> { ColumnDataType.find( u => u.Id == row.Type )?.value }</TableCell>  
                      <TableCell align="left">{row.UserAccess}</TableCell>  
                      <TableCell align="left" >
                        <DeleteOutlinedIcon onClick={ () => { AppColumnMasterStore.deleteItem(row.Id).then( () => {   AppColumnMasterStore.getColumnList(id); } )}}  />
                      </TableCell>             */}
                    </TableRow>
                  ))}

                  <TableRow key="AddNew"  >   
                    <TableCell colSpan={2}>
                      <NavLink to={`/AppConfigItemEdit/${item.Id}/` } >Add New {item.Title}</NavLink>
                      {/* <Button color="primary" onClick={ () => { openModel( new AppConfigType() ) }}>Add New {item.Title}</Button>    */}
                    </TableCell>                                                                                  
                    
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>
          </ListItem>                    
      </List>

    </Container>
  );
};

export default observer(AppConfigTypeEdit);

