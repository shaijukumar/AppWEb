import React from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import {        
    TextField,    
  } from "@material-ui/core";


type CustomTxtProps = { label: string, multiline?: boolean, width?: string  } & FieldAttributes<{}>;

const MyCustomTxt: React.FC<CustomTxtProps> = ({ label, placeholder, type,required,autoComplete, autoFocus,multiline, width, ...props }) => {

    //const [field] = useField<{}>(props);

    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
  //var multiline = true;
    return (      
        <TextField
            placeholder={placeholder}
            {...field}
            type={type}          
            helperText={errorText}
            error={!!errorText}
            variant="outlined"
            margin="normal"
            required={required}
           //autoComplete={autoComplete}
            autoFocus={autoFocus}
            fullWidth   
            label={label}
            multiline={multiline}  
            style={{width: width, display: 'block'}}                                   
      />           
    );        
  };

export default MyCustomTxt;

