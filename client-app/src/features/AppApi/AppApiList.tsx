import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppApiContext } from './AppApiStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { AppApiAction } from './AppApi';
import { AppStatusListContext } from '../AppStatusList/AppStatusListStore';
 
const AppApiList: React.FC = () => {


  const AppApiStore = useContext(AppApiContext);     
  const AppStatusListStore = useContext(AppStatusListContext);
  
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {    
      AppStatusListStore.getList();           
      setLoading(true);
      let act: AppApiAction = new AppApiAction()
      act.ActionId = 8;      
      AppApiStore.ExecuteQuery(act).then( (res) => {     
        setLoading(false);              
      });      

    }, [AppApiStore.ExecuteAction])       

    if(loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppApiItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppApiStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>                  
                  <TableCell align="left">CustomerName</TableCell>
                  <TableCell align="left">CIF</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AppApiStore.apiResult.Result1.map((row) => (
                  <TableRow key={row.Id} >
                     <TableCell align="left">{row.Id}</TableCell> 
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/AppApiItemEdit/" + row.Id } >{row.CustomerName}</NavLink> 
                    </TableCell>
                                             
                    {/* <TableCell align="left">{row.CustomerName}</TableCell>   */}
                    <TableCell align="left">{row.CIF}</TableCell> 
                    <TableCell align="left">{ AppStatusListStore.itemList.find( s => s.Id == row.StatusId )?.Title }</TableCell>         

                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { 
                        debugger;
                          setLoading(true);
                          let act: AppApiAction = new AppApiAction()
                          act.ActionId = 13;
                          act.ItemId = row.Id;
                          AppApiStore.ExecuteQuery(act).then( (res) => { 
                            debugger;
                            let act: AppApiAction = new AppApiAction();
                            act.ActionId = 8; 
                            AppApiStore.ExecuteQuery(act).then( (res) => {
                              setLoading(false);  
                            });
                          });

                          // setLoading(true);
                          // let act: AppApiAction = new AppApiAction()
                          // act.ActionId = 13;
                          // act.Parm1 = row.Id.toString();
                          // AppApiStore.ExecuteQuery(act).then( (res) => {                                    
                          //     let act: AppApiAction = new AppApiAction()
                          //     act.ActionId = 8;      
                          //     AppApiStore.ExecuteQuery(act).then( (res) => {     
                          //     setLoading(false);              
                          //   }); 
                          // }); 
                         }}  />
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>

      </List>        
     
    );
};

export default observer(AppApiList);
