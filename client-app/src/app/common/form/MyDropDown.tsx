import React from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { IPageCategory } from "../../../features/PageCategory/PageCategory";

type CustomProps = { label: string, list : any, handleChange?: any } & FieldAttributes<{}>;

const MyDropDown: React.FC<CustomProps> = ({ list, label, placeholder, type,required,autoComplete, autoFocus, handleChange, ...props }) => {

    //const [field] = useField<{}>(props);

    const [field, meta] = useField<{}>(props);
    
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (                
        <FormControl variant="outlined" fullWidth style={{ marginTop : 10 , marginBottom : 10}}>
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
                  row.Pid != row.Id && <option value={row.Id}>{row.Title}</option>               
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
                  row.Pid != row.Id && <option value={row.Id}>{row.Title}</option>               
                ))}
            </Select>
            }
        </FormControl>
    );
  };

export default MyDropDown;