import { LinearProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import ToDoEdit from '../../features/ToDo/ToDoEdit';
import ToDoList from '../../features/ToDo/ToDoList';
import Login from '../../features/user/Login';
import { UserStoreContext } from '../../features/user/UserStore';
import PageTagList from '../../features/PageTag/PageTagList';
import PageTagEdit from '../../features/PageTag/PageTagEdit';
import SitePageList from '../../features/SitePage/SitePageList';
import SitePageEdit from '../../features/SitePage/SitePageEdit';
import { PageTagContext } from '../../features/PageTag/PageTagStore';
import PageCategoryList from '../../features/PageCategory/PageCategoryList';
import PageCategoryEdit from '../../features/PageCategory/PageCategoryEdit';
import UserList from '../../features/user/UserList';
import UserEdit from '../../features/user/UserEdit';
import AppUserRoleList from '../../features/AppUserRole/AppUserRoleList';
import AppUserRoleEdit from '../../features/AppUserRole/AppUserRoleEdit';
import AppUserAccessList from '../../features/AppUserAccess/AppUserAccessList';
import AppUserAccessEdit from '../../features/AppUserAccess/AppUserAccessEdit';
import AppTableMasterList from '../../features/AppTableMaster/AppTableMasterList';
import AppTableMasterEdit from '../../features/AppTableMaster/AppTableMasterEdit';
import AppColumnMasterList from '../../features/AppColumnMaster/AppColumnMasterList';
import AppColumnMasterEdit from '../../features/AppColumnMaster/AppColumnMasterEdit';
import AppUserRoleMasterList from '../../features/AppUserRoleMaster/AppUserRoleMasterList';
import AppUserRoleMasterEdit from '../../features/AppUserRoleMaster/AppUserRoleMasterEdit';
import AppDataList from '../../features/AppData/AppDataList';
import AppDataEdit from '../../features/AppData/AppDataEdit';
import AppStatusListList from '../../features/AppStatusList/AppStatusListList';
import AppStatusListEdit from '../../features/AppStatusList/AppStatusListEdit';
import AppHistoryList from '../../features/AppHistory/AppHistoryList';
import AppHistoryEdit from '../../features/AppHistory/AppHistoryEdit';
import AppConfigTypeList from '../../features/AppConfigType/AppConfigTypeList';
import AppConfigTypeEdit from '../../features/AppConfigType/AppConfigTypeEdit';
import AppConfigList from '../../features/AppConfig/AppConfigList';
import AppConfigEdit from '../../features/AppConfig/AppConfigEdit';
import AppActionList from '../../features/AppAction/AppActionList';
import AppActionEdit from '../../features/AppAction/AppActionEdit';
import AppFlowList from '../../features/AppFlow/AppFlowList';
import AppFlowEdit from '../../features/AppFlow/AppFlowEdit';
import AppApiList from '../../features/AppApi/AppApiList';
import AppApiEdit from '../../features/AppApi/AppApiEdit';
import AppAttachmentList from '../../features/AppAttachment/AppAttachmentList';
import AppAttachmentEdit from '../../features/AppAttachment/AppAttachmentEdit';
//##FeatureImport##"
const App = () => {
 
  const userStore = useContext(UserStoreContext);
  const PageTagStore = useContext(PageTagContext);
  const  [loader, setLoader ] = useState(true)
  
  useEffect(() => {
     
    userStore.getCurrentUser().then( () => {
      PageTagStore.getList().then( () => {
        setLoader(false);
      });            
    })
    .catch( () => {      
      setLoader(false);
    })
  }, [userStore, userStore.getCurrentUser])

  if(loader){
    return <LinearProgress color="secondary"  className="loaderStyle" />     
  }
  return (
       
    <>            
      <NavBar/>
      <Container style={{ marginTop: '7em' }}>
        <Route exact path='/login' component={Login} />
        <Route exact path='/userlist' component={UserList} />
        <Route exact path={['/useredit/:id', '/useredit/']} component={UserEdit} />

        <Route exact path='/' component={HomePage} />
        <Route exact path='/todolist' component={ToDoList} />
        <Route exact path={['/todoedit/:id', '/todoedit/']} component={ToDoEdit} />
        <Route path='/PageTagList' component={PageTagList} />
        <Route path={['/PageTagItemEdit/:id', '/PageTagItemEdit/']} component={PageTagEdit} />

        <Route path='/SitePageList' component={SitePageList} />
        <Route path={['/SitePageItemEdit/:id', '/SitePageItemEdit/']} component={SitePageEdit} />

				<Route path='/PageCategoryList' component={PageCategoryList} />
        <Route  path={['/PageCategoryItemEdit/:id', '/PageCategoryItemEdit/']} component={PageCategoryEdit} />        
        <Route path='/AppUserRoleList' component={AppUserRoleList} />
        <Route  path={['/AppUserRoleItemEdit/:id', '/AppUserRoleItemEdit/']} component={AppUserRoleEdit} />
        <Route path='/AppUserAccessList' component={AppUserAccessList} />
        <Route  path={['/AppUserAccessItemEdit/:id', '/AppUserAccessItemEdit/']} component={AppUserAccessEdit} />
        <Route path='/AppTableMasterList' component={AppTableMasterList} />
        <Route  path={['/AppTableMasterItemEdit/:id', '/AppTableMasterItemEdit/']} component={AppTableMasterEdit} />
        <Route path='/AppColumnMasterList' component={AppColumnMasterList} />
        <Route  path={['/AppColumnMasterItemEdit/:id', '/AppColumnMasterItemEdit/']} component={AppColumnMasterEdit} />
        <Route path='/AppUserRoleMasterList' component={AppUserRoleMasterList} />
        <Route  path={['/AppUserRoleMasterItemEdit/:id', '/AppUserRoleMasterItemEdit/']} component={AppUserRoleMasterEdit} />
        <Route path='/AppDataList' component={AppDataList} />
        <Route  path={['/AppDataItemEdit/:id', '/AppDataItemEdit/']} component={AppDataEdit} />
        <Route path='/AppStatusListList' component={AppStatusListList} />
        <Route  path={['/AppStatusListItemEdit/:id', '/AppStatusListItemEdit/']} component={AppStatusListEdit} />
        <Route path='/AppHistoryList' component={AppHistoryList} />
        <Route  path={['/AppHistoryItemEdit/:id', '/AppHistoryItemEdit/']} component={AppHistoryEdit} />
        <Route path='/AppConfigTypeList' component={AppConfigTypeList} />
        <Route  path={['/AppConfigTypeItemEdit/:id', '/AppConfigTypeItemEdit/']} component={AppConfigTypeEdit} />

        <Route path='/AppConfigList' component={AppConfigList} />
        <Route  path={['/AppConfigItemEdit/:id', '/AppConfigItemEdit/']} component={AppConfigEdit} />

        <Route path='/AppActionList' component={AppActionList} />
        <Route  path={['/AppActionItemEdit/:id', '/AppActionItemEdit/']} component={AppActionEdit} />
        <Route path='/AppFlowList' component={AppFlowList} />
        <Route  path={['/AppFlowItemEdit/:id', '/AppFlowItemEdit/']} component={AppFlowEdit} />
        <Route path='/AppApiList' component={AppApiList} />
								<Route  path={['/AppApiItemEdit/:id', '/AppApiItemEdit/']} component={AppApiEdit} />
								<Route path='/AppAttachmentList' component={AppAttachmentList} />
								<Route  path={['/AppAttachmentItemEdit/:id', '/AppAttachmentItemEdit/']} component={AppAttachmentEdit} />
								{/*##Navigation##*/}
        
      </Container>
    </>
  );
}; 

export default observer(App);

















