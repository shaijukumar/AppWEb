import React, { useContext, useEffect, useState } from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { ApiContext, AppConfig } from "../../../Portal/Api/Api";


type CustomProps = { configId:number, label: string,  handleChange?: any, width?: string  } & FieldAttributes<{}>;

const ConfigDropDown: React.FC<CustomProps> = ({ configId, label, placeholder, type,required,autoComplete, autoFocus, handleChange, width, ...props }) => {

    //const [field] = useField<{}>(props);
    const ApiStore = useContext(ApiContext);

    const [field] = useField<{}>(props);
    const [configList, setConfigList] = useState<AppConfig[]>();

    

    useEffect(() => {
      ApiStore.getConfigList(configId, setConfigList); //.then( res => {setConfigList(res)});
    },[ ApiStore.getConfigList]);
    
   
    return ( 
      
      <React.Fragment>
        {configList &&
        <FormControl variant="outlined" fullWidth style={{ marginTop : 10 , marginBottom : 10, width:width,  display: 'block' }} >
            <InputLabel  style={{  fontSize:'14px', padding: '1px'}}   >{label}</InputLabel>    

            {handleChange && 
            <Select
            
              //onChange={OnChange}
                {...field}
                native
                fullWidth            
                onChange={handleChange}
                label={label} 
                style={{paddingTop : '10px', height: '15px'}}     
                                    
            >
                <option aria-label="None" value=""  />
                {(configList as any).map((row:any) => (                              
                  row.Pid !== row.Id && <option key={row.Id} value={row.Id}>{row.Title}</option>               
                ))}
            </Select>
            } 

            {!handleChange && 
            <Select
              style={{ height: '40px', paddingTop: "1px !important", fontSize:'14px', padding: '1px'}}             
                //onChange={OnChange}
                {...field}
                native
                fullWidth                           
                label={label}            
            >
                <option aria-label="None" value=""  />
                {(configList as any).map((row:any) => (                              
                  row.Pid !== row.Id && <option key={row.Id} value={row.Id}>{row.Title}</option>               
                ))}
            </Select>
            }
        </FormControl>
        }
        </React.Fragment>
    );
  };

export default ConfigDropDown;


