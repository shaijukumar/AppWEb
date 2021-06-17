import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import {  IUserFormValues } from './User';
import { UserStoreContext } from './UserStore';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Login: React.FC = () => {

  const classes = useStyles();
  const userStore = useContext(UserStoreContext);

  return (
    
    <Container component="main" maxWidth="xs">        
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={{ email: 'shaiju@test.com', password: 'Pa$$w0rd'}}
          validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Required'),
              password: Yup.string().required('Required')        
          })}
          onSubmit={(user:IUserFormValues, { setSubmitting }) => {           
            userStore.userLogin(user);
          }}
        >
          <Form className={classes.form}> 
            <MyCustomTxt   
                name="email"                         
                type="text"                
                autoFocus={true}
                required={true}                
                autoComplete="current-email"  
                label="Email"                                                                     
              />
            <MyCustomTxt   
                name="password"                         
                type="password"                                
                required={true}                
                autoComplete="current-password"  
                label="Password"                                                                       
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>  


          </Form>
        </Formik>

      </div>
    </Container>
  );
};
 
 export default Login;