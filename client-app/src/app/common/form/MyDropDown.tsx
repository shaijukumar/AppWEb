import React from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


type CustomProps = { label: string, list : any, handleChange?: any, width?: string  } & FieldAttributes<{}>;

const MyDropDown: React.FC<CustomProps> = ({ list, label, placeholder, type,required,autoComplete, autoFocus, handleChange, width, ...props }) => {

    //const [field] = useField<{}>(props);

    const [field] = useField<{}>(props);
    
   
    return (                
        <FormControl variant="outlined" fullWidth style={{ marginTop : 10 , marginBottom : 10, width:width,  display: 'block'}} >
            <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
            {handleChange && 
            <Select
              //onChange={OnChange}
                {...field}
                native
                fullWidth            
                onChange={handleChange}
                label={label}            
            >
                <option aria-label="None" value="" />
                {list.map((row:any) => (                              
                  row.Pid !== row.Id && <option value={row.Id}>{row.Title}</option>               
                ))}
            </Select>
            }

            {!handleChange && 
            <Select
              //onChange={OnChange}
                {...field}
                native
                fullWidth                           
                label={label}            
            >
                <option aria-label="None" value="" />
                {list.map((row:any) => (                              
                  row.Pid !== row.Id && <option value={row.Id}>{row.Title}</option>               
                ))}
            </Select>
            }
        </FormControl>
    );
  };

export default MyDropDown;