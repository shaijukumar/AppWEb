import React, { useContext, useEffect, useState } from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { ApiContext, AppConfig } from "../../../Portal/Api/Api";
import { MenuItem } from "@material-ui/core";

type CustomProps = { configId:number, label: string, width?: string  } & FieldAttributes<{}>;



const ConfigDropDown: React.FC<CustomProps> = ({ configId, label, placeholder, type,required,autoComplete, autoFocus, width, ...props }) => {

    const ApiStore = useContext(ApiContext);

    const [field] = useField<{}>(props);
    const [configList, setConfigList] = useState<AppConfig[]>();


    useEffect(() => {
      ApiStore.getConfigList(configId, setConfigList); //.then( res => {setConfigList(res)});
    },[ ApiStore.getConfigList]);
    
      
    return ( 
      
      <FormControl variant="outlined"  size="small" style={{ marginTop : 10 , marginBottom : 10, width:width,  }}>
        <InputLabel id={`${field.name}-select-outlined-label`}>{label}</InputLabel>      
        <Select
          {...field}
          labelId={`${field.name}-select-outlined-label`}
          id={`${field.name}-select-outlined`}
          label={label}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {configList &&  (configList as any).map((row:any) => (                              
              <MenuItem key={row.Id} value={row.Id}>{row.Title}</MenuItem>               
          ))}
        </Select>        
      </FormControl>
    );
  };

export default ConfigDropDown;


