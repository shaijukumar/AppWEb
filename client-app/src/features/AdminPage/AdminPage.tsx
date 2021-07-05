import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Icon, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import 'material-design-icons/iconfont/material-icons.css'

const AdminPage: React.FC = () => {  
  
   
    const AdminLinks = [
        { Id : 1,  Path : 'userlist', Title : 'User List', Icon : 'person' },
        { Id : 2,  Path : 'AppUserRoleMasterList', Title : 'User Role Master', Icon : 'groups' },
        { Id : 3,  Path : 'AppTableMasterList', Title : 'Tables', Icon : 'storage' },
        { Id : 4,  Path : 'AppColumnMasterList', Title : 'Columns', Icon : 'view_column' },
        { Id : 5,  Path : 'AppStatusListlist', Title : 'Status List', Icon : 'keyboard_tab' },
        { Id : 6,  Path : 'AppConfigTypeList', Title : 'App Config Types', Icon : 'event' },
        { Id : 7,  Path : 'AppConfigList', Title : 'Config List', Icon : 'description' },
        { Id : 8,  Path : 'AppFlowList', Title : 'Flow List', Icon : 'dns' },
        { Id : 9,  Path : 'AppActionList', Title : 'Action List', Icon : 'build' },
        { Id : 10,  Path : 'AppNitificationTemplatelist', Title : 'Nitification Templates', Icon : 'notifications' },
        { Id : 11,  Path : 'AppNavigationlist', Title : 'Navigation List', Icon : 'settings_input_hdmi' },
    ];

     
    
    const TableColumns = [
      {
        title: "Page",
        field: "Page",
        render : (values: any) => { return <NavLink to={"/" + values.Path } >{<ListItemIcon><Icon>{values.Icon}</Icon> <ListItemText style={{paddingLeft : '40px'}} primary={values.Title} /></ListItemIcon>}</NavLink> }        
      } 
    ]
      const tableData = [
        {
          lorem: "lorem",
          name: "name",
          customStatus: "customStatus"
        }
      ];

    const tableRef = React.createRef();

    return (
       
        <List>
            {AdminLinks.map((row) => (
            <NavLink to={row.Path}   key={row.Id} id={row.Path}>                                                           
                <ListItem button >
                    <ListItemIcon>                           
                        <Icon>{row.Icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={row.Title} />
                </ListItem>
            </NavLink>
            ))}  
        </List>                   
    );
};

export default observer(AdminPage);
