import { Button, ButtonGroup, Checkbox, Container, FormControlLabel, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import {  useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { UserManager } from './UserManager';
import { UserManagerContext } from './UserManagerStore';
import { observer } from 'mobx-react-lite';
import { debug } from 'console';
import { UserStoreContext } from '../user/UserStore';

const UserProfile: React.FC = () => {

    const userStore = useContext(UserStoreContext);

    useEffect(() => {
       
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <h6>Welcome {userStore.user.DisplayName} </h6>
        </Container>
    )
}

export default observer(UserProfile);