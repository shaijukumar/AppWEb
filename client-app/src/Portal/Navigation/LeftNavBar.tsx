import React, { useContext, useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ApiContext, AppApiAction } from '../Api/Api';
import { AppNavigation } from './Navigation';

 
const LeftNavBar: React.FC = () => {
   
    const ApiStore = useContext(ApiContext);
    const [data, setData] = useState<AppNavigation[]>();
    
    useEffect(() => {       
        let act: AppApiAction = new AppApiAction()
        act.ActionId = 34;      
        ApiStore.ExecuteQuery(act).then( (res) => {  
            setData(res.Result1.sort((a:AppNavigation,b:AppNavigation) => a.Order - b.Order));                          
        });             
    }, [ApiStore, ApiStore.ExecuteQuery])  

    return (  
        
        <React.Fragment>
        {data &&   
            <React.Fragment>         
                <Divider />  
                <List>
                    {(data).map((row) => (
                    <NavLink to={row.Path}   key={row.Id} id={row.Path}>                                                                                 
                        <ListItem button   selected={row.Selected}>
                            <ListItemIcon>                           
                                <Icon>{row.Icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={row.Title} />
                        </ListItem>
                        <Divider />  
                    </NavLink>
                    ))}  
                </List>
                
            </React.Fragment>  
        }          
        </React.Fragment>
    );

}

export default observer(LeftNavBar);