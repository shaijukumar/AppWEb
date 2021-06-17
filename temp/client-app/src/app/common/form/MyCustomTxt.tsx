import React from "react";
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray
} from "formik";

import {    
    Radio,
    FormControlLabel,
    TextField,    
  } from "@material-ui/core";


type CustomTxtProps = { label: string } & FieldAttributes<{}>;

const MyCustomTxt: React.FC<CustomTxtProps> = ({ label, placeholder, type,required,autoComplete, autoFocus, ...props }) => {

    //const [field] = useField<{}>(props);

    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

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
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            fullWidth   
            label={label}
      />           
    );
    
    //<FormControlLabel {...field} control={<Radio />} label={label} />;
    
  };

export default MyCustomTxt;

