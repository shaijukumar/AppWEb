import React, { useContext, useEffect, useState } from "react";
import {  
  useField,
  FieldAttributes,
  Field,  
  
} from "formik";

import FormControl from '@material-ui/core/FormControl';
import { ApiContext, AppUserRoleMaster, IAppUser, IAppUserRoleMaster } from "../../../Portal/Api/Api";
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

type CustomProps = { multiple?:boolean, label: string, width?: string  } & FieldAttributes<{}>;



const UserSelect: React.FC<CustomProps> = ({ multiple=false, label, placeholder, type,required,autoComplete, autoFocus, width, ...props }) => {

    const ApiStore = useContext(ApiContext);
    const [field, , { setValue }] = useField<{}>(props);
    const [val, setVal] =useState<IAppUser[]>();

    useEffect(() => {
      ApiStore.getUserList().then( res => {
        setVal(res);        
      }); 
    },[ ApiStore.getUserList]);
    
      
    return ( 
            
      <FormControl variant="outlined"  size="small" style={{ marginTop : 10 , marginBottom : 10, width:width, display: 'block' }}>
        {val  &&
        <Autocomplete id="UserAccessRoles" className="customFieldMargin" multiple={multiple}   
            {...field}
            size="small"              
            value={field.value as IAppUser[]}
            options={val as any[]} 
            getOptionLabel={(option:IAppUser) => option.Username}                  
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option:any, index) => (
                value  && <Chip variant="outlined" label={option.Username} {...getTagProps({ index })} /> 
              ))
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label={label} placeholder={placeholder} fullWidth />
            )}
            
            onChange={(event:any, newValue:any) => {
              //debugger;
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

export default UserSelect;


