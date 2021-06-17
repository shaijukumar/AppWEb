import React from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import ContentEditable from "react-contenteditable";

type CustomTxtProps = { label: string } & FieldAttributes<{}>;

const HtmlEditField: React.FC<CustomTxtProps> = ({ label, placeholder, type,required,autoComplete, autoFocus, ...props }) => {

    //const [field] = useField<{}>(props);

    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    const [value, setValue] = React.useState(field.value as string);

    return (      
      <div> <br/><br/>val: {value}<br/><br/>
      <ContentEditable
        
        className="editable"
        tagName="pre"
        html={value}// innerHTML of the editable div
        //disabled={!this.state.editable} // use true to disable edition
        onChange={(d:any) => { 
          debugger; 
          field.value = d.target.value;
          setValue(field.value as string);
          setValue(d.target.value);
          props.value = d.target.value;
          
          //props.value = d.target.value ;
          //item.PageHtml = d.target.value ; 
          //setItem(item as any); 
          //stt(d.target.value);
        }} // handle innerHTML change
        //onBlur={this.sanitize}
      />
</div>
      // <p
      //   //className={editing ? 'editing' : ''}
      //   //onClick={editOnClick ? this.toggleEdit : undefined}
      //   contentEditable={true}
      //   // ref={(domNode) => {
      //   //   this.domElm = domNode;
      //   // }}
      //   //onBlur={this.save}
      //   //onKeyDown={this.handleKeyDown}
      //   {...field}
      //   suppressContentEditableWarning={true}
      // >
      //   {}
      // </p>

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
      // />           
    );
    
    //<FormControlLabel {...field} control={<Radio />} label={label} />;
    
  };

export default HtmlEditField;

