import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react'

import { UserStoreContext } from '../user/UserStore';



function HomePage() {
    
    const userStore = useContext(UserStoreContext);

    useEffect(() => {
       
    }, [])

    return (
        <div >
           
           
            <br/><br/>
            <h6>Welcome {userStore.user.DisplayName} </h6>
            <br/><br/><br/><br/>                                   
        </div> 
          
    );
}

export default observer(HomePage)