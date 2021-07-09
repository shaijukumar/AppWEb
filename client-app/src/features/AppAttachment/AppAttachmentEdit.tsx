import { Button, ButtonGroup, Container, LinearProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppAttachment } from './AppAttachment';
import { AppAttachmentContext } from './AppAttachmentStore';
import { observer } from 'mobx-react-lite';

interface DetailParms {
  id: string;
}
const AppAttachmentEdit: React.FC = () => {

  const { id } = useParams<DetailParms>();
  const AppAttachmentStore = useContext(AppAttachmentContext);
 
  let history = useHistory();
  const [item, setItem] = useState(new AppAttachment());
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    AppAttachmentStore.loadItem( Number(id));
    if (id) {
      AppAttachmentStore.loadItem(Number(id)).then((val) => {
        setItem(val as any);     
        setLoading(false);   
      });
    } else {
      setItem(new AppAttachment()); 
      setLoading(false);     
    }
    
  }, [id, AppAttachmentStore, AppAttachmentStore.loadItem]);

  const [file, setFile] = useState<Blob[]>();

  const onFileChange = (event:any) => { 
    debugger;
    setFile(event.target.files);  
  }

  const onItemSubmit = (values: any) => {   

    setLoading(true);

    let formData = new FormData();
    if(file){
      for(var i=0;i<file.length;i++){
        formData.append('FileList', file[i]);
      }
      //file.forEach( f =>  formData.append('FileList', f)  );

      // file.forEach( (f) => { 
      //   formData.append('FileList', f);
      // });
    }

    
    
    // file.forEach( (f) => { 
    //   formData.append('FileList', f);
    // });

    formData.append('Prop1', JSON.stringify(values) );
    formData.append('Prop2', "Prop test Two");

    AppAttachmentStore.uploadPhoto(formData as any)
    
    AppAttachmentStore.editItem(values).then((val) => {
	  history.push('/AppAttachmentlist');
      //debugger;
    });
  };

  //const [file, setFile] = useState<ApiAttachment[]>();

  const onFileUpload = () => { 
    //AppAttachmentStore.uploadPhoto(file as any)
  }; 

  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    <Container component="main" maxWidth="xs">  

      <Formik
          initialValues={item}
          validationSchema={Yup.object({
            FileName: Yup.string().required('Title required'),                     
          })}
          onSubmit={onItemSubmit}
        >
          <Form > 
            {item.Id}
            <MyCustomTxt   
              name="FileName"                         
              type="text"                
              autoFocus={true}
              required={true}                                
              label="FileName"                                                                     
            />

           
            <div> 
                <input type="file" multiple={true} onChange={onFileChange} /> 
                <button onClick={onFileUpload}> 
                  Upload! 
                </button> 
            </div>
                           
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
                      AppAttachmentStore.deleteItem(Number(item.Id) ).then( () => {
                        history.push('/AppAttachmentlist');
                      })
                    }}
                  >
                    Delete
                  </Button>
                }
                <Button onClick={ () => { history.push('/AppAttachmentlist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>
    </Container>
  );
};

export default observer(AppAttachmentEdit);

