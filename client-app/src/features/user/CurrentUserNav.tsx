import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserStoreContext } from './UserStore';

const CurrentUserNav: React.FC= () => {

   const userStore = useContext(UserStoreContext);
      
    return (
        <React.Fragment>
            <NavLink to="/currentuser" className="appBarNavLink">
                {userStore.user.DisplayName}
            </NavLink>
            { userStore.user.DisplayName && 
                <NavLink to="/login" className="appBarNavLink" onClick={ () => {
                    userStore.userLogout();
                }} >
                    Logout
                </NavLink>
            }         
        </React.Fragment>
    );
};

export default observer(CurrentUserNav);