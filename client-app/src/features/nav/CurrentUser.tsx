
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton,  Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { UserStoreContext } from '../user/UserStore';
import { observer } from 'mobx-react-lite';

const CurrentUser: React.FC = () => {

    const userStore = useContext(UserStoreContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    let history = useHistory();
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToPath = (path:string) => {
        setAnchorEl(null);
        history.push(path); 
    };

    return (  
        <React.Fragment>
            <IconButton color="inherit" aria-haspopup="true" onClick={handleClick}>
                <AccountCircle />
            </IconButton>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                > 
                <MenuItem  onClick={ () => navigateToPath('/UserProfile')} >Profile</MenuItem>              
                <MenuItem onClick={() => {
                    userStore.userLogout();
                }}>Logout</MenuItem>
            </Menu>
</React.Fragment>
    );
}

export default observer(CurrentUser);

