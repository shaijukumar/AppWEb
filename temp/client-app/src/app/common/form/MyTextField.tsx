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
      fullWidth      
    />  
  );
};

export default MyTextField;

