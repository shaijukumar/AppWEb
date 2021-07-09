import { Button, ButtonGroup, Container, LinearProgress, List, ListItem, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogContentText, Link, AppBar, Tabs, Tab } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppTableMaster } from './AppTableMaster';
import { AppTableMasterContext } from './AppTableMasterStore';
import { observer } from 'mobx-react-lite';
import { AppColumnMasterContext } from '../AppColumnMaster/AppColumnMasterStore';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AppColumn from '../AppColumnMaster/AppColumn';
import { AppColumnMaster } from '../AppColumnMaster/AppColumnMaster';
import { ColumnDataType } from '../../app/common/SystemConstants';

interface DetailParms {
  id: string;
}
const AppTableMasterEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppTableMasterStore = useContext(AppTableMasterContext);
  const AppColumnMasterStore = useContext(AppColumnMasterContext); 
 
  let history = useHistory();
  const [item, setItem] = useState(new AppTableMaster());
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(new AppColumnMaster());

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };
 
 
  
  
  
  useEffect(() => {

    AppTableMasterStore.loadItem(Number(id));
    if (id) {      
      AppColumnMasterStore.getColumnList(Number(id));
      AppTableMasterStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppTableMaster()); 
      setLoading(false);     
    }
    
  }, [id, AppTableMasterStore, AppTableMasterStore.loadItem, AppColumnMasterStore.getColumnList, AppColumnMasterStore]);

  const onItemSubmit = (values: any) => {    
    setLoading(true);
    AppTableMasterStore.editItem(values).then((val) => {
      history.push('/AppTableMasterlist');
      // debugger;
      // setItem(new AppTableMaster(val));
      // setLoading(false);
    });
  };

  const openModel = (col: AppColumnMaster) => {  
    if(!col.TableID){
      col.TableID = item.Id;
    }
    setSelectedColumn(col);
    setOpen(true);
  };

  const RefreshColumns = (col: AppColumnMaster) => {  
    //refresh colu
    AppColumnMasterStore.getColumnList(Number(id));
    setOpen(false);
  };

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    <Container component="main" maxWidth="lg">  

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

            {/* <MyCustomTxt   
                name="UserAccess"                         
                type="text"                
                autoFocus={true}
                required={false}   
                multiline={true}                             
                label="User Access"                                                                     
            /> */}
                           
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
                      AppTableMasterStore.deleteItem(item.Id).then( () => {
                        history.push('/AppTableMasterlist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppTableMasterlist');  }}>Back</Button>   

              </ButtonGroup>

          </Form>
        </Formik>


        <List>
          <ListItem divider>
            {/* <h5>Column List</h5>   */}
              
            <div>
              <AppBar position="static">
                <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Column List" />
                  <Tab label="Actions" />                  
                </Tabs>
              </AppBar>                           
          </div>
      
          </ListItem>
          
          <div hidden={tabValue !== 0}>
          <ListItem divider hidden={true}  >
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>ID</TableCell> */}
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">AppDataFiled</TableCell>
                    {/* <TableCell align="left">User Access</TableCell> */}
                    <TableCell align="left">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {AppColumnMasterStore.columnList.map((row) => (
                    <TableRow key={row.Id} >
                      {/* <TableCell component="th" scope="row"  >
                        <NavLink to={"/AppColumnMasterItemEdit/" + row.Id } >{row.Id}</NavLink> 
                      </TableCell> */}
                                              
                      <TableCell align="left"  >
                        <Link href="#" onClick={ () => { openModel( row ) } } >{row.Title}</Link>
                        
                      </TableCell>  
                      <TableCell align="left"> { ColumnDataType.find( u => u.Id === row.Type )?.value }</TableCell> 
                      <TableCell align="left">{row.AppDataFiled}</TableCell> 
                      {/* <TableCell align="left">{row.UserAccess}</TableCell>   */}
                      <TableCell align="left" >
                        <DeleteOutlinedIcon onClick={ () => { AppColumnMasterStore.deleteItem(row.Id).then( () => {   AppColumnMasterStore.getColumnList(Number(id)); } )}}  />
                      </TableCell>            
                    </TableRow>
                  ))}

                  <TableRow key="AddNew" >                                                                  
                   
                    <Button color="primary" onClick={ () => { openModel( new AppColumnMaster() ) }}>Add New Column</Button>   
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </ListItem>                    
          </div>
     
      </List> 

      <Dialog onClose={() => {}} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Column</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <AppColumn initVal={selectedColumn} parentRefresh={RefreshColumns} />
          </DialogContentText>
        </DialogContent>           
      </Dialog>      
    </Container>


  );
};

export default observer(AppTableMasterEdit);

