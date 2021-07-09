import { Container} from '@material-ui/core';
import React, { useContext, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
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