
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {  Badge, IconButton, List, ListItem, TableContainer, Table, TableCell, TableRow, TableBody, Paper  } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { observer } from 'mobx-react-lite';
import { AppNotificationsContext } from '../AppNotifications/AppNotificationsStore';
import DoneIcon from '@material-ui/icons/Done';



const Notifications: React.FC = () => {

    const AppNotificationsStore = useContext(AppNotificationsContext);    
        
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [count, SetCount ] = useState(0);
  
    useEffect(() => {       
        AppNotificationsStore.getCount().then( c => {
            SetCount(c as any);
        });                  
      }, [AppNotificationsStore, AppNotificationsStore.getList])   
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      
      AppNotificationsStore.getList();

      AppNotificationsStore.getCount().then( c => {
          SetCount(c as any);
      });
    };

          
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
      };
      
    return (  
        <React.Fragment>
            <IconButton color="inherit" aria-haspopup="true" onClick={handleClick}>
                <Badge badgeContent={count} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <div style={ {width:1000}} >
                <List>
                  <ListItem divider>
                    Notifications
                  </ListItem>
                  
                  <ListItem divider>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        {/* <TableHead>
                          <TableRow>                            
                            <TableCell align="left">Subject</TableCell>                           
                            <TableCell align="left">Delete</TableCell>
                          </TableRow>
                        </TableHead> */}
                        <TableBody>
                          {AppNotificationsStore.itemList.map((row) => (
                            <TableRow key={row.Id} >
                              {/* <TableCell component="th" scope="row"  >
                                <NavLink to={"/AppNotificationsEdit/" + row.Id } >{row.Id}</NavLink> 
                              </TableCell> */}
                                                      
                                <TableCell align="left" width={30} >
                                {!row.ReadStatus && 
                                  <DoneIcon onClick={ () => { AppNotificationsStore.markRead(row.Id).then( () => { 

                                      AppNotificationsStore.getList(); 
                                      AppNotificationsStore.getCount().then( c => {
                                          SetCount(c as any);
                                      });  

                                  })}}  />
                                }
                              </TableCell> 
                              <TableCell align="left"  >
                                <NavLink to={ `/${row.NotificationsMaster.AppPath}`}  >
                                  {row.NotificationsMaster.Subject}
                                </NavLink>
                              </TableCell>                                
                                         
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ListItem>

                </List>    
                </div>
            </Popover>

           
</React.Fragment>
    );
}

export default observer(Notifications);
