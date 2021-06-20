import React, { useState } from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { IPageCategory } from "../../../features/PageCategory/PageCategory";

type CustomProps = { label: string, list : any, handleChange?: any } & FieldAttributes<{}>;

const MyAttachment: React.FC<CustomProps> = ({ list, label, placeholder, type,required,autoComplete, autoFocus, handleChange, ...props }) => {

    //const [field] = useField<{}>(props);

    const [field, meta] = useField<{}>(props);
    const [file, setFile] = useState<Blob[]>();
    
    const errorText = meta.error && meta.touched ? meta.error : "";

    const onFileChange = (event:any) => { 
      debugger;
      setFile(event.target.files);  
    }

    return (                
        <FormControl variant="outlined" fullWidth style={{ marginTop : 10 , marginBottom : 10}}>
            <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
            
            <input type="file" multiple={true} onChange={onFileChange} /> 
            
        </FormControl>
    );
  };

export default MyAttachment;