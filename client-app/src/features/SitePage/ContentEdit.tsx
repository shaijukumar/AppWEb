
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from "sanitize-html";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox } from '@material-ui/core';

import {  
  useField,
  FieldAttributes
} from "formik";

type CustomTxtProps = { label: string, setFieldValue : any } & FieldAttributes<{}>;

//https://codesandbox.io/s/l91xvkox9l?file=/src/index.js:114-155

const ContentEdit: React.FC<CustomTxtProps> = ({ label, placeholder, type,required,autoComplete, autoFocus,setFieldValue, ...props }) => {

  const [field, meta, helpers,] = useField<{}>(props);
  const [value, setValue] = React.useState(field.value as string);

  const [itemHtml, setItem] = useState('<p>Hello <b>World</b> !</p><p>Paragraph 2</p>');
  const [viewHtml, setViewHtml] = useState(false);

  const handleChange = (d:any) => {  
    debugger;
    field.value = d.target.value;
    setValue(field.value as string);
    setValue(d.target.value);
    props.value = d.target.value;

    setFieldValue('PageHtml', d.target.value);
    //setFieldTouched("PageHtml", true);

    //setItem( d.target.value );
  }

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
    allowedAttributes: { 'a': ["href"] }
  };

  const sanitize = () => {
    //debugger;
    //var v = sanitizeHtml(itemHtml, sanitizeConf);
    //setItem(sanitizeHtml(itemHtml, sanitizeConf));
  };

  return (
            
    <div>

      <FormControlLabel control={<Checkbox name="HtmlSelect"  checked={viewHtml} onChange={() => { setViewHtml(!viewHtml) }} />} label="Html" />

      { !viewHtml && <ContentEditable
        {...field} 
        className="editable"
        tagName="pre"
        html={value} // innerHTML of the editable div
        onChange={handleChange} // handle innerHTML change
        onBlur={sanitize}
      />}
      
      {viewHtml && <textarea
        className="editable"
        value={value}
        onChange={handleChange}
        onBlur={sanitize}
      />}
 
    </div>
     
    );
};

export default ContentEdit;



