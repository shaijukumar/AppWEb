import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppNitificationTemplate } from './AppNitificationTemplate';
import { AppNitificationTemplateContext } from './AppNitificationTemplateStore';
import { observer } from 'mobx-react-lite';
import ContentEditable from "react-contenteditable";

interface DetailParms {
  id: string;
} 
const AppNitificationTemplateEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppNitificationTemplateStore = useContext(AppNitificationTemplateContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppNitificationTemplate());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppNitificationTemplateStore.loadItem(Number(id));
    if (id) {
      AppNitificationTemplateStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppNitificationTemplate()); 
      setLoading(false);     
    }
    
  }, [id, AppNitificationTemplateStore, AppNitificationTemplateStore.loadItem]);

  const onItemSubmit = (values: any) => {    
      setLoading(true);
      AppNitificationTemplateStore.editItem(values).then((val) => {
      history.push('/AppNitificationTemplatelist');
    });
  };

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    <Container component="main" maxWidth="xs">  

      <Formik
          initialValues={item}
          validationSchema={Yup.object({
            Title: Yup.string().required('Template Name required'),      
            Template: Yup.string().required('Template required'),                         
          })}
          onSubmit={onItemSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid, dirty, setFieldValue, setFieldTouched, validateForm }) => (
          <Form > 
            {item.Id}
            <MyCustomTxt   
              name="Title"                         
              type="text"                
              autoFocus={true}
              required={true}                                
              label="Template Name"                                                                     
            />

            {/* <MyCustomTxt   
              name="Template"                         
              type="text"                              
              required={true}                                
              label="Template"   
              multiline={true}                                                                  
            /> */}

            <ContentEditable
              id="Template"              
              className="editable"
              tagName="pre"
              html={item.Template} // innerHTML of the editable div
              //disabled={!this.state.editable} // use true to disable edition
              onChange={(d:any) => { 
                debugger;                                 
                item.Template = d.target.value ; 
                setFieldValue('PageHtml', d.target.value);
                setFieldTouched("PageHtml", true);
                
              }} // handle innerHTML change
              //onBlur={sanitize}
            />
           
            <MyCustomTxt   
              name="Description"                         
              type="text"                                                        
              label="Description"                                                                     
            />
                           
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"                  
                >
                  Save
                </Button> 
                { item.Id && 
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"                    
                    onClick={ () => {
                      AppNitificationTemplateStore.deleteItem(Number(item.Id)).then( () => {
                        history.push('/AppNitificationTemplatelist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppNitificationTemplatelist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        )} 
       </Formik>
    </Container>
  );
};

export default observer(AppNitificationTemplateEdit);

