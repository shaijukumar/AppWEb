
import { Chip } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { PageTagContext } from './PageTagStore';
interface IProps {
    IdList: string;   
  }


const TagChip : React.FC<IProps> = ({ IdList }) => {  
    
    const PageTagStore = useContext(PageTagContext);
    
    return (
        
        <div>{ 
                IdList && IdList.split(' ').map( t => ( 
                    t &&  <Chip size="small" color="primary" variant="outlined" label={PageTagStore.getTag(t)}   />       
                )) 
            }
        </div>
    )
}

export default TagChip;