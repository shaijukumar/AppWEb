

import React, { useContext, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';
import { AppNavigationContext } from '../AppNavigation/AppNavigationStore';
import { observer } from 'mobx-react-lite';

 
const AppLeftNavBar: React.FC = () => {

    const AppNavigationStore = useContext(AppNavigationContext);

    useEffect(() => {       
        AppNavigationStore.getList().then( () => {
            //AppNavigationStore.itemList[0].Selected = true;
        });               
    }, [AppNavigationStore, AppNavigationStore.getList])  

    return (  
        <React.Fragment>
            <Divider />
            <List>
                {AppNavigationStore.itemList.map((row) => (
                <NavLink to={row.Path}   key={row.Id} id={row.Path}>                                                           
                    <ListItem button   selected={row.Selected}>
                        <ListItemIcon>                           
                            <Icon>{row.Icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={row.Title} />
                    </ListItem>
                </NavLink>
                ))}  
            </List>            
        </React.Fragment>
    );

}

export default observer(AppLeftNavBar);