import React, { useEffect, useState } from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import {        
  FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,        
  } from "@material-ui/core";
import _ from "lodash";




type CustomTxtProps = { CurrecySymbol?: string, label: string,  width?: string, onChange?:any  } & FieldAttributes<{}>;

const MyCurrencyInput: React.FC<CustomTxtProps> = ({ CurrecySymbol= "$", label, placeholder, type,required,autoComplete, autoFocus, width, onChange, ...props }) => {

  const [field,meta , { setValue }] = useField<{}>(props);
  const [text, setText] = useState("");

  const onTextChange = (event: any) => {    
    formatNumber(event.target.value);        
  }

  const formatNumber = (val: string) => {

    if(val){
      val = val.toString();
      val = val.replace(/\,/g, '');
      var num = Number(val);
      if(_.isNaN(num)) return;
      
      setValue(num);
      var parts = val.toString().split(".");    
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      val =  parts.join(".");
      setText(val); 
    }
      
  }
  
  useEffect(() => {    
    formatNumber(field.value as any);   
  },[]);
    
    
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (     
      <FormControl variant="outlined" fullWidth style={{ marginTop : 10 , marginBottom : 10, width:width,  display: 'block', }} size="small"  >
        <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>         
          <OutlinedInput
            id="outlined-adornment-amount"
            // {...field}     
            value={text}       
            onChange={onTextChange}
            startAdornment={<InputAdornment position="start">{CurrecySymbol}</InputAdornment>}
            labelWidth={60}     
            style={{  width:width }}   
                
          />
      </FormControl>             
    );        
  };

export default MyCurrencyInput;

