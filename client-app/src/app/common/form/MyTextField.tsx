import React from "react";
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray
} from "formik";
import { TextField } from "@material-ui/core";


const MyTextField: React.FC<FieldAttributes<{}>> = ({  
  placeholder,
  type,
  required,
  autoComplete, 
  ...props
  
}) => {
  
  const [field, meta, { setValue }] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

 
  
  const onTextChange = (event: any) => {
    debugger;
    alert(1);
  }

  field.onChange = () => {
    debugger;
    alert(1);
  }
  
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
      fullWidth  

      
    />  
  );
};

export default MyTextField;

