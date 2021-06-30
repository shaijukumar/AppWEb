
import React, { useContext } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { NavLink, useHistory } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar, Button, CssBaseline, makeStyles, Menu, MenuItem } from '@material-ui/core';
import CurrentUserNav from '../user/CurrentUserNav';
import { UserStoreContext } from '../user/UserStore';
import { observer } from 'mobx-react-lite';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  const userStore = useContext(UserStoreContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  let history = useHistory();
  
  const handleClose = () => {
    setAnchorEl(null);        
  };

  const navigateToPath = (path:string) => {
    setAnchorEl(null);
    history.push(path); 
  };

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  return (  
    <React.Fragment>
      <CssBaseline />
     
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            
              <NavLink to="/" className={classes.toolbarTitle} >              
                  Wayooz           
              </NavLink>       
              { userStore.user.DisplayName &&             
            <nav>
              <NavLink to="/todolist" className="appBarNavLink">
                Todo
              </NavLink>
              <NavLink to="/PageTagList" className="appBarNavLink">
                Page Tag
              </NavLink>
              <NavLink to="/SitePageList" className="appBarNavLink">
                Pages
              </NavLink>
              <NavLink to="/PageCategorylist" className="appBarNavLink">
                Page Category
              </NavLink>
                            
              <CurrentUserNav/>    

              <span>
                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Application
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={ () => navigateToPath('/userlist')}>User List</MenuItem>
                    <MenuItem onClick={ () => navigateToPath('/AppUserRoleMasterList')}>User Role Master</MenuItem>
                    <MenuItem onClick={ () => navigateToPath('/AppUserRoleList')}>User Role List</MenuItem>
                    <MenuItem onClick={ () => navigateToPath('/AppUserAccessList')}>UserAccess List</MenuItem>

                    <MenuItem onClick={ () => navigateToPath('/AppTableMasterList')}>Tables</MenuItem>
                    <MenuItem onClick={ () => navigateToPath('/AppColumnMasterList')}>Columns</MenuItem>
                    
                    <MenuItem onClick={ () => navigateToPath('/AppStatusListlist')}>Status List</MenuItem>

                    <MenuItem onClick={ () => navigateToPath('/AppConfigTypeList')}>App Config Types</MenuItem>
                    <MenuItem onClick={ () => navigateToPath('/AppConfigList')}>Config List</MenuItem>

                    <MenuItem onClick={ () => navigateToPath('/AppFlowList')}>Flow List</MenuItem>
                    <MenuItem onClick={ () => navigateToPath('/AppActionList')}>Action List</MenuItem>                    
                  </Menu>  
              </span>                                                                           
            </nav>                                    
          } 
          </Toolbar>          
        </AppBar>
            
    </React.Fragment>
  );
};

export default observer(NavBar);

