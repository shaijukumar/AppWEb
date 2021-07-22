import React from 'react'
import { useParams } from 'react-router-dom';
import {Card, Typography } from '@material-ui/core';
import { AppTheme } from '../Theme';



interface Parms {
  message : string;   
}


const ErrorMessage: React.FC<Parms> = ({ message="" }) => {


  return (
    <React.Fragment>
      {message && 
        <Card style={{ margin: '10px', padding: '10px', color:AppTheme.ErrorMessgeColor}}>{message}</Card>        
      }
    </React.Fragment>
  );
};

export default ErrorMessage;

