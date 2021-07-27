import React, { useEffect } from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import {        
    TextField,    
  } from "@material-ui/core";

import moment from 'moment';

type CustomTxtProps = { label: string, multiline?: boolean, width?: string  } & FieldAttributes<{}>;

const MyCustomTxt: React.FC<CustomTxtProps> = ({ label, placeholder, type,required,autoComplete, autoFocus,multiline, width, ...props }) => {

  const [field,meta , { setValue }] = useField<{}>(props);
  
  useEffect(() => {
    if( type == "date" ){
      debugger;
      if(field.value){
        setValue(moment(field.value).format("YYYY-MM-DD"));
      }      
    }
  },[]);
    //const [field] = useField<{}>(props);

    
    //const [txtMargin] = useField('normal');
    const errorText = meta.error && meta.touched ? meta.error : "";
  //var multiline = true;
    return (      
        <TextField
           
            placeholder={placeholder}
            {...field}
            type={type}          
            error={!!errorText}
            variant="outlined"
            margin='normal'
            required={required}
           //autoComplete={autoComplete}
            autoFocus={autoFocus}
            fullWidth   
            label={label}
            multiline={multiline}  
            style={{width: width, display: 'block'}}    
            size='small'  
            
            InputLabelProps={{
              shrink: true,
            }}

                                      
      />           
    );        
  };

export default MyCustomTxt;

