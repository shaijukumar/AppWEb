
import React, { useEffect, useState } from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import FormControl from '@material-ui/core/FormControl';

import { Checkbox, FormControlLabel } from "@material-ui/core";


type CustomProps = { checked?: boolean, label?: string, width?: string  } & FieldAttributes<{}>;

const MyCheckBox : React.FC<CustomProps> = ({ checked, label, placeholder, type,required,autoComplete, autoFocus,  width, ...props }) => {
    
    const [field] = useField<{}>(props);
    const [val, setVal] = useState(false);

    useEffect(() => {
      setVal(field.value as boolean);      
    },[setVal]);
       
    return (                  
        <FormControl variant="outlined" fullWidth style={{ marginTop : 10 , marginBottom : 10, width:width,  display: 'block'}} >
           <FormControlLabel  
                control={<Checkbox {...field}  checked={val} onClick={ () => { setVal(!val);} }  />}
                label={label}              
          />
        </FormControl>              
    );
  };

export default MyCheckBox;
