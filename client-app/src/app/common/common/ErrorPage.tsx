import React from 'react'
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import {Typography } from '@material-ui/core';
import { AppTheme } from '../Theme';


interface DetailParms {
  err: string
}


const ErrorPage: React.FC = () => {

  const { err } = useParams<DetailParms>();

  return (
    <Typography variant="h6" gutterBottom style={{padding:50, color: AppTheme.ErrorMessgeColor }}>
        {err}
    </Typography>  
  );
};

export default observer(ErrorPage);

