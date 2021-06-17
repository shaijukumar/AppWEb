import React, { useContext, useEffect, useState } from "react";
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes
} from "formik";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import 'rsuite/dist/styles/rsuite-default.css';
import { IPageTag, PageTag } from "../../../features/PageTag/PageTag";
import { PageTagContext } from "../../../features/PageTag/PageTagStore";
import { Chip } from "@material-ui/core";

type MyTagProps = { label: string, Tags: string;  } & FieldAttributes<{}>;

const MyTag : React.FC<MyTagProps> = ({ label, Tags, ...props }) => {

    const [field] = useField<{}>(props);
    const PageTagStore = useContext(PageTagContext);   
      

    const [tgList, setTgList] = useState<PageTag[]>(); 
    const [tagSel, setTagSel] = useState()


    const [value, setValue] = React.useState(field.value as IPageTag[]);

    useEffect(() => {
debugger;
     // let val:string = field.value as string;      
     
      /*
       let tgLst: IPageTag[] = [];
      if(val){
          val.split(' ').map( t => {  
              let tg = new PageTag();    
              tg.Id = t;
              tg.value = t;
              tg.label = PageTagStore.getTag(t);
              tgLst.push(tg);          
          });               
        }             
        setTgList(tgLst);
        */
    }, []);

    const useStyles = makeStyles({
      listbox: {
        boxSizing: 'border-box',
        '& ul': {
          padding: 0,
          margin: 0,
        },
      },
    });

    const classes = useStyles();


    return (
      <>
        
      {/* <div>value : { tgList && tgList.map( (v) => ( <div>[[{v.label}]]</div>) ) } </div> */}
  

      {field.value && 
      <Autocomplete
          value={value}
          multiple
          id={field.name}          
          options={PageTagStore.itemList as any[]}
          classes={classes}
          getOptionLabel={(option:any) => option.label}
          //style={{ backgroundColor: while }}          
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option:any, index) => (
              field.value  && <Chip variant="outlined" label={option.label} {...getTagProps({ index })} /> 
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label={label} placeholder={label} fullWidth />
          )}
          
          onChange={(event:any, newValue:any) => {
            debugger;
            setValue(newValue);
            //field.value = newValue;
            //setTgList(newValue as any);  
            //props.value =  "b64f8613-09b5-4040-a4c6-29ac0beb07e3";
            //field.value = "b64f8613-09b5-4040-a4c6-29ac0beb07e3";         
          }}
      />
        }
      
      </>
    )         
  };

export default MyTag;
