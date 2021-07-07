
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar, Badge, Button, CssBaseline, IconButton, makeStyles, Theme, createStyles, List, ListItem, TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Paper  } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popper from '@material-ui/core/Popper';
import { UserStoreContext } from '../user/UserStore';
import { observer } from 'mobx-react-lite';
import { AppNotificationsContext } from '../AppNotifications/AppNotificationsStore';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const Notifications: React.FC = () => {

    const AppNotificationsStore = useContext(AppNotificationsContext);    
    
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [count, SetCount ] = useState(0);
    let history = useHistory();

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

    const navigateToPath = (path:string) => {
      setAnchorEl(null);
      history.push(path); 
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
