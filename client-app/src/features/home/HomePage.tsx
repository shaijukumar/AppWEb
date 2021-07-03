import Button from '@material-ui/core/Button/Button';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import TestABCD from '../../app/common/form/TestABCD';
import testComp from '../test/testComp';


import { UserStoreContext } from '../user/UserStore';



function HomePage() {
    let history = useHistory();

    const userStore = useContext(UserStoreContext);

    useEffect(() => {
       
    }, [])

    return (
        <div >
           
           
            <br/><br/>
            <h6>Welcome {userStore.user.DisplayName} </h6>
            <br/><br/><br/><br/>
            {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={ () => {                   
                   history.push('/login');
                   
                }}               
              >
                Sign In
              </Button>  */}

                         
        </div> 
          
    );
}

export default observer(HomePage)