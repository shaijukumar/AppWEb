import React, { useEffect } from 'react'
import {Dialog, DialogActions, DialogContent, DialogContentText, Typography, Button } from '@material-ui/core';
import { AppTheme } from '../Theme';


interface Parms {
    message : string;  
    timeStamp : string;
  }

const MessageDialog: React.FC<Parms> = ({ message="", timeStamp = "" }) => {
    
  const [open, setOpen] = React.useState(false);
  //const [errMsg, setErrMsg] = React.useState('');

  useEffect(() => {
     // var t = timeStamp;
      if(message){
        //setErrMsg(message)
        setOpen(true);
      }   
  }, [timeStamp, message]);



  const handleClose = () => {
    setOpen(false);
    message = "";
  };

  return (
    <Dialog
        open={open}
        onClose={handleClose}
    >    
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <Typography variant="h6" gutterBottom style={{padding:50, color: AppTheme.ErrorMessgeColor }}>
            {message}
        </Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions>          
      <Button onClick={handleClose} color="primary" autoFocus>
        Close
      </Button>
    </DialogActions>
  </Dialog>

      
  );
};

export default MessageDialog;

