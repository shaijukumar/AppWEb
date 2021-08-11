import React, { useContext, useEffect, useState } from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import FormControl from '@material-ui/core/FormControl';
import { ApiContext, AppConfig, IAppConfig } from "../../../Portal/Api/Api";
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

type CustomProps = { multiple?:boolean, configType:string, label: string, width?: string  } & FieldAttributes<{}>;



const ConfigDropDown: React.FC<CustomProps> = ({ multiple=false, configType, label, placeholder, type,required,autoComplete, autoFocus, width, ...props }) => {

    const ApiStore = useContext(ApiContext);

    const [field, , { setValue }] = useField<{}>(props);
    const [configList, setConfigList] = useState<AppConfig[]>();


    useEffect(() => {
      //debugger;
      ApiStore.getConfigList(configType, setConfigList).then( res => { 
        
        if(field.value && (field.value as any).length > 0){
          var roleArray = ApiStore.configFromArray(res, field.value as any);  
          if(!multiple && roleArray.length>0){
            setValue(roleArray[0]);
          }
          else{
            setValue(roleArray);
          }        
        }
        else{
          setValue(new AppConfig() );
        }

        setConfigList(res)
      
      });
    },[ ApiStore.getConfigList, setConfigList]);
    
      
    return ( 
      
      // <FormControl variant="outlined"  size="small" style={{ marginTop : 10 , marginBottom : 10, width:width,  }}>
      //   <InputLabel id={`${field.name}-select-outlined-label`}>{label}</InputLabel>      
      //   <Select
      //     {...field}
      //     labelId={`${field.name}-select-outlined-label`}
      //     id={`${field.name}-select-outlined`}
      //     label={label}
      //   >
      //     <MenuItem value=""><em>None</em></MenuItem>
      //     {configList &&  (configList as any).map((row:any) => (                              
      //         <MenuItem key={row.Id} value={row.Id}>{row.Title}</MenuItem>               
      //     ))}
      //   </Select>        
      // </FormControl>

    
 
    <FormControl variant="outlined"  size="small" style={{ marginTop : 10 , marginBottom : 10, width:width, display: 'block' }}>
      {configList && 
        <Autocomplete id="UserAccessRoles" className="customFieldMargin" multiple={multiple}   
            {...field}
            size="small"              
            value={field.value as IAppConfig[]}
            options={configList as AppConfig[]} 
            getOptionLabel={(option:AppConfig) => option.Title}                  
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option:any, index) => (
                value  && <Chip variant="outlined" label={option.Title} {...getTagProps({ index })} /> 
              ))
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label={label} placeholder={placeholder} fullWidth />
            )}
            
            onChange={(event:any, newValue:any) => {
              debugger;
              var unq = true;

              if(multiple){
                for(let i=0;i<newValue.length-1;i++){
                  if( newValue[i].Id === newValue[newValue.length-1].Id){
                    unq = false;
                    break;
                  }
                }
              }
              
              if(unq){
                setValue(newValue);
              }                                          
            }}
        />
          }
      </FormControl>

    
    );
  };

export default ConfigDropDown;


