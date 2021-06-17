import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { PageCategoryContext } from '../../../features/PageCategory/PageCategoryStore';

type CustomTxtProps = { CategoryId: string };

//const PageCategoryItem: React.FC = () => {   
const PageCategoryItem: React.FC<CustomTxtProps> = ({CategoryId}) => {   

  const PageCategoryStore = useContext(PageCategoryContext);

  const [title, setTitle] = useState("");
  
  useEffect(() => {
      console.log('PageCategoryItem : ' + CategoryId);
      for(let i=0;i<PageCategoryStore.itemList.length;i++){
        if( PageCategoryStore.itemList[i].Id == CategoryId ){
          setTitle( PageCategoryStore.itemList[i].Title);
          break;
        }
      }

  }, [PageCategoryStore]);

  return (
    <div>{title}</div>    
  );
};

export default observer(PageCategoryItem);

