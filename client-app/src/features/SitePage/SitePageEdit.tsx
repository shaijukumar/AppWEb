import { Button, ButtonGroup, Chip, Container, LinearProgress, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { SitePage } from './SitePage';
import { SitePageContext } from './SitePageStore';
import { observer } from 'mobx-react-lite';
import { Tag, TagGroup } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import MyTag from '../../app/common/form/MyTag';
import { PageTagContext } from '../PageTag/PageTagStore';
import { IPageTag, PageTag } from '../PageTag/PageTag';
import { Autocomplete } from '@material-ui/lab';
import ContentEditable from "react-contenteditable";

import PageCategorySelect from '../../app/common/form/PageCategorySelect';
import { PageCategoryContext } from '../PageCategory/PageCategoryStore';
import ContentEdit from './ContentEdit';


interface DetailParms {
  id: string;
}
const SitePageEdit: React.FC = () => {

  
  const { id } = useParams<DetailParms>();
  let history = useHistory();

  const SitePageStore = useContext(SitePageContext);
  const PageTagStore = useContext(PageTagContext);
  const PageCategoryStore = useContext(PageCategoryContext);
 
  
  const [item, setItem] = useState(new SitePage());
  const [loading, setLoading] = useState(true);  
  const [tagList, setTagList] = useState<PageTag[]>();
  
  const sanitize = () => {
    //item.PageHtml = d.target.value ;
    //this.setState({ html: sanitizeHtml(this.state.html, this.sanitizeConf) });
  };

  useEffect(() => {
    
    PageCategoryStore.getList();
    SitePageStore.loadItem(id);
    let tgLst: IPageTag[] = [];
    if (id) {
      SitePageStore.loadItem(id).then((val) => {
                 
        if(val){         
          if(val?.Tags){
            val?.Tags.split(' ').map( t => {                  
                let tg = new PageTag();    
                tg.Id = t;
                tg.value = t;
                tg.label = PageTagStore.getTag(t);
                tg.value && tgLst.push(tg);          
            });               
          }
        }       
        setTagList(tgLst);              
        setItem(val as any);  
        setLoading(false);   
      });
    } else {
      setItem(new SitePage()); 
      setTagList(tgLst);
      setLoading(false);     
    }
    
  }, [id, SitePageStore, SitePageStore.loadItem, setTagList]);

  const onItemSubmit = (values: any) => {    
    //debugger;   
    setLoading(true);
    values.Tags = "";
    tagList?.map( t => {
      values.Tags += t.Id + " ";
    });
    
    SitePageStore.editItem(values).then((val) => {      
      setItem(new SitePage(val));
      setLoading(false);
    });

  };

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    <Container component="main" maxWidth="xs">  
      
      <Formik
          initialValues={item}
          //dirty={}
          validationSchema={Yup.object({
            Title: Yup.string().required('Title required'),   
            URLTitle: Yup.string().required('URL Title required'), 
            CatId: Yup.string().required('Category required'),  
            PageHtml: Yup.string().required('PageHtml required'),                 
          })}
          onSubmit={onItemSubmit}          
        >
      
{({ handleChange, handleBlur, handleSubmit, values, isValid, dirty, setFieldValue, setFieldTouched, validateForm }) => (
          <Form >             
            
          <MyCustomTxt   
              name="Title"                         
              type="text"                
              autoFocus={true}
              required={true}                                
              label="Title"                                                                     
            />

            <MyCustomTxt   
              name="URLTitle"                         
              type="text"                
              required={true}                                
              label="URLTitle"                                                                     
            />
               

            <PageCategorySelect
                name="CatId"                                                                         
                required={false}                                
                label="Category" 
                list={PageCategoryStore.itemList}
                parent= {false}
             />
                                          
              <Autocomplete     
                  className="customFieldMargin"                              
                  value={tagList}
                  multiple
                  id="TagList"          
                  options={PageTagStore.itemList as any[]}
                  //classes={classes}
                  getOptionLabel={(option:any) => option.label}                  
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option:any, index) => (
                      tagList  && <Chip variant="outlined" label={option.label} {...getTagProps({ index })} /> 
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Tags" placeholder="Tags" fullWidth />
                  )}
                  
                  onChange={(event:any, newValue:any) => {
                    debugger;
                    setTagList(newValue);                           
                  }}
              />
            
            <ContentEditable
              id="PageHtml"              
              className="editable"
              tagName="pre"
              html={item.PageHtml} // innerHTML of the editable div
              //disabled={!this.state.editable} // use true to disable edition
              onChange={(d:any) => { 
                debugger;                                 
                item.PageHtml = d.target.value ; 
                setFieldValue('PageHtml', d.target.value);
                setFieldTouched("PageHtml", true);
                
              }} // handle innerHTML change
              onBlur={sanitize}
            />            

            {/* <textarea
              className="editable"
              value={item.PageHtml}
              onChange={ (d:any) => {setFieldValue('PageHtml', d.target.value);} }
              //onBlur={this.sanitize}
            /> */}
                         
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button
                  // disabled={!isValid}
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
                      SitePageStore.deleteItem(item.Id).then( () => {
                        history.push('/SitePagelist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/SitePagelist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
           )}        
        </Formik>      
    </Container>
  );
};

export default observer(SitePageEdit);

