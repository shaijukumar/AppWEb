import React from "react";
import {  
  useField,
  FieldAttributes,
  Field   
} from "formik";

import {        
  Checkbox,
    FormControlLabel,
    TextField,    
  } from "@material-ui/core";


type CustomTxtProps = { label: string , handleChange?: any } & FieldAttributes<{}>;

const MyCheckBox: React.FC<CustomTxtProps> = ({ label, handleChange, placeholder, type,required,autoComplete, autoFocus,...props }) => {

  const [field, setFiled ] = useField(props.name);
  const [value, setValue] = React.useState(field.value as boolean)
    //const [field] = useField<{}>(props);

    // const [field, meta] = useField<{}>(props);
    // const [value, setValue] = React.useState(field.value as boolean)
    // const errorText = meta.error && meta.touched ? meta.error : "";


  //var multiline = true;
    return (      

        <FormControlLabel
          
          control={<Checkbox checked={value}  />}
          label={label}    
          {...field}
          onChange={handleChange}
          // onClick={ (d:any) => {
          //   debugger;
          //   setValue(!value );  } }           
        />
      //   <TextField
      //       placeholder={placeholder}
      //       {...field}
      //       type={type}          
      //       helperText={errorText}
      //       error={!!errorText}
      //       variant="outlined"
      //       margin="normal"
      //       required={required}
      //      //autoComplete={autoComplete}
      //       autoFocus={autoFocus}
      //       fullWidth   
      //       label={label}
      //       multiline={multiline}                               
      // />           
    );  
    
    ;
  };

export default MyCheckBox;


{/* <CheckBox
checked={values.check}
onPress={() => setFieldValue('check', !values.check)}
/> */}

{/* <FormControlLabel
              control={<Checkbox id="IsActive" name="IsActive" checked={item.IsActive} onClick={ () => { item.IsActive = !item.IsActive; setItem(item) } }  />}
              label="IsActive"              
            /> */}