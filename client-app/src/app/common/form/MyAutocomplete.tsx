import React from "react";
import {  
  useField,
  FieldAttributes,  
  Field
} from "formik";



import {        
    TextField,    
  } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";


type CustomTxtProps = { label: string, multiline?: boolean } & FieldAttributes<{}>;

const MyAutocomplete: React.FC<CustomTxtProps> = ({ label, placeholder, type,required,autoComplete, autoFocus,multiline, ...props }) => {

    const [field, meta] = useField<{}>(props);
    const [value, setValue] = React.useState(field.value as any);
    const classes = useStyles();

    
    const errorText = meta.error && meta.touched ? meta.error : "";
  //var multiline = true;
    return (      
        
       <></>

    );        
  };

export default MyAutocomplete;

function useStyles() {
    throw new Error("Function not implemented.");
}

