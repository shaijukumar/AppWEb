import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppActionContext } from './AppActionStore';
import {  Button, ButtonGroup, LinearProgress, List, ListItem} from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { AppFlowContext } from '../AppFlow/AppFlowStore';
import { AppTableMasterContext } from '../AppTableMaster/AppTableMasterStore';
import { AppStatusListContext } from '../AppStatusList/AppStatusListStore';
import { IAppAction } from './AppAction';
import MaterialTable from 'material-table';
  
const AppActionList: React.FC = () => {

  const AppActionStore = useContext(AppActionContext);   
  const AppFlowStore = useContext(AppFlowContext);  
  const AppTableMasterStore = useContext(AppTableMasterContext);
  const AppStatusListStore = useContext(AppStatusListContext);
  
    useEffect(() => {     
      AppFlowStore.getList();
      AppTableMasterStore.getList();
      AppStatusListStore.getList();

      AppActionStore.getList();                  
    }, [AppActionStore, AppActionStore.getList, AppFlowStore, AppStatusListStore, AppTableMasterStore])       

    if(AppActionStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    const ShowDesc = (text: string) => {    
     // debugger;
      var res = "";
      if(text){
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text,"text/xml");
        res = xmlDoc.getElementsByTagName("Desc")[0].innerHTML;
      }
      return res;
    };

    
    const TableColumns = [
      {
        title: "Id",
        field: "Id",       
        width: "10%"
      },
      {
        title: "Action",
        field: "Action",
        render : (values: IAppAction) => { return <NavLink to={"/AppActionItemEdit/" + values.Id } >{values.Action}</NavLink> }
        //render : (values: IAppAction) => { return <NavLink to={"/AppNavigationItemEdit/" + values.Id } >{values.Title}</NavLink> }
        //lookup: { "Resubmit": 'Resubmit', "Approve": 'Approve', "New Request" : "New Request", "Reject" : "Reject"},
      },
      {
        title: "From Status",
        field: "FromStatus",       
        render : (values: IAppAction) => { return values.FromStatusList.map( (fs, i, arr) =>(<span key={fs.Id} >{fs.Title}{i !== (arr.length-1) ? ',' : ''} </span>) )  }
      }, 
      {
        title: "To Status",
        field: "FromStatus",       
        render : (values: IAppAction) => { return  AppStatusListStore.itemList.find( u => u.Id === values.ToStatusId )?.Title }
      },     
      {
        title: "ActionType",
        field: "ActionType",
        //render : rend
        //render : (values: IAppHistory) => { return AppStatusListStore.itemList.find( u => u.Id ==values.FromStage )?.Title }
      }, 
      {
        title: "Flow",
        field: "Flow",  
        render : (values: IAppAction) => { return AppFlowStore.itemList.find( u => u.Id === values.FlowId )?.Title }  
      },
      {
        title: "Table",
        field: "Table",  
        render : (values: IAppAction) => { return AppTableMasterStore.itemList.find( u => u.Id === values.TableId )?.Title  }  
      },
      {
        title: "WhenXml",
        field: "WhenXml",  
        render : (values: IAppAction) => { return ShowDesc(values.WhenXml)  }  
      },
      {
        title: "ActionXml",
        field: "ActionXml",  
        render : (values: IAppAction) => { return ShowDesc(values.ActionXml)  }  
      },
      {
        title: "Delete",
        field: "Delete",  
        render : (values: IAppAction) => { return <DeleteOutlinedIcon onClick={ () => { AppActionStore.deleteItem(values.Id).then( () => {   AppActionStore.getList(); })}}  />  }  
      },
    ];


    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppActionItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppActionStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>

        <div className={"tabcontainers1"}>
          <div className={"tabcontainers2"} >        
            <MaterialTable                       
              title="Left Navigation List"
              data={AppActionStore.itemList}
              columns={TableColumns}
              options={{ search: true, paging: true, filtering: true, exportButton: true, pageSize:100,  tableLayout: "auto" }}            
            />
          </div>
        </div>
        
        

      </List>        
     
    );
};

export default observer(AppActionList);
