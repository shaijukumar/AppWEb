import React from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { IPageCategory } from "../../../features/PageCategory/PageCategory";

type CustomTxtProps = { label: string, list : IPageCategory[], parent? : boolean } & FieldAttributes<{}>;

const PageCategorySelect: React.FC<CustomTxtProps> = ({ list, parent, label, placeholder, type,required,autoComplete, autoFocus, ...props }) => {

    //const [field] = useField<{}>(props);

    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (                
        <FormControl variant="outlined" fullWidth >
            <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
            <Select
                {...field}
                native
                fullWidth            
                //onChange={handleChange}
                label={label}            
            >
                <option aria-label="None" value="" />
                {list.map((row) => (                              
                  row.Pid != row.Id && <option value={row.Id}>{row.Title}</option>               
                ))}

            </Select>
        </FormControl>
    );
  };

export default PageCategorySelect;