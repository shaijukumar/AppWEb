import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppAttachmentContext } from './AppAttachmentStore';
import { Button, ButtonGroup, LinearProgress, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import fileDownload from 'js-file-download'
import axios from 'axios';

const AppAttachmentList: React.FC = () => {

  const AppAttachmentStore = useContext(AppAttachmentContext);     
  
  

  const download = (id: number, fileName : string) => { 
    
    AppAttachmentStore.download(id,fileName);
    
    // const method = 'GET';
    // const url = `http://localhost:5000/api/AppAttachment/${id}`;

    // axios
    //   .request({url, method, responseType: 'blob'})
    //   .then(({ data }) => {
    //     const downloadUrl = window.URL.createObjectURL(new Blob([data]));
    //     const link = document.createElement('a');
    //     link.href = downloadUrl;
    //     link.setAttribute('download', fileName); //any other extension
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    //   });    

    
    // AppAttachmentStore.download(id).then((val) => {
    //   debugger;
    //   console.log(val);
    //   //fileDownload(val, fileName);
	  //   //history.push('/AppAttachmentlist');
    //   //debugger;
    //   //setItem(new AppAttachment(val));
    //   //setLoading(false);

    //     const downloadUrl = window.URL.createObjectURL(new Blob([val]));
    //     const link = document.createElement('a');
    //     link.href = downloadUrl;
    //     link.setAttribute('download', fileName); //any other extension
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();

    // });
  };

    useEffect(() => {       
      AppAttachmentStore.getList();                  
    }, [AppAttachmentStore, AppAttachmentStore.getList])       

    if(AppAttachmentStore.loading){
      return <LinearProgress color="secondary"  className="loaderStyle" />     
    }

    return (
      <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/AppAttachmentItemEdit/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { AppAttachmentStore.getList(); }}>Refresh</Button>          
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">FileName</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AppAttachmentStore.itemList.map((row) => (
                  <TableRow key={row.Id} >
                    <TableCell component="th" scope="row"  >
                      <NavLink to={"/AppAttachmentItemEdit/" + row.Id } >{row.Id}</NavLink> 
                    </TableCell>
                                             
                    <TableCell align="right" >
                      <a href="#" onClick={ () => { download(row.Id, row.FileName)} } >{row.FileName}</a> 
                    </TableCell>  
                    <TableCell align="right" >
                      <DeleteOutlinedIcon onClick={ () => { AppAttachmentStore.deleteItem(row.Id).then( () => {   AppAttachmentStore.getList(); })}}  />
                    </TableCell>            
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>

      </List>        
     
    );
};

export default observer(AppAttachmentList);
