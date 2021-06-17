import React from "react";
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray
} from "formik";

import {    
    Radio,
    FormControlLabel,    
  } from "@material-ui/core";


type MyRadioProps = { label: string } & FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {

    const [field] = useField<{}>(props);
    return <FormControlLabel {...field} control={<Radio />} label={label} />;
    
  };

export default MyRadio;

