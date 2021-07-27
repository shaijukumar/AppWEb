
import React, { useEffect, useState } from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import FormControl from '@material-ui/core/FormControl';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


type CustomProps = { checked?: boolean, label?: string, width?: string  } & FieldAttributes<{}>;

const MyDatePicker : React.FC<CustomProps> = ({ checked, label, placeholder, type,required,autoComplete, autoFocus,  width, ...props }) => {
    
  
    const [field,meta , { setValue }] = useField<{}>(props);
    const [val, setVal] = useState(false);
    

    // useEffect(() => {
    //   setVal(field.value as boolean);      
    // },[setVal]);

    const [selectedDate, handleDateChange] = useState(new Date());
       
    return (                  
        <FormControl variant="outlined" fullWidth style={{ marginTop : 10 , marginBottom : 10, width:width,  display: 'block'}} size="small" >
           {/* <FormControlLabel  
                control={<Checkbox {...field}  checked={val} onClick={ () => { setVal(!val);} }  />}
                label={label}              
          /> */}

      {/* <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="With keyboard"
        format="MM/dd/yyyy"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={date => handleDateChange(date)}
        onFocus={ () => { console.log(1); }}
        onBlur={() => { console.log(2);}}
      /> */}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>           
          <DatePicker
            {...field}
            autoOk
            variant="inline"
            inputVariant="outlined"
            label={label}
            
            onChange={ (v:any) => { setValue(v) }}
            size="small"
            fullWidth
            format="dd-MMM-yyyy"
          />            
        </MuiPickersUtilsProvider>

        </FormControl>              
    );
  };

export default MyDatePicker;
