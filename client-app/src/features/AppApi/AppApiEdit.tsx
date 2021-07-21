import { Button, ButtonGroup, Container, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,  } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import MyCustomTxt from '../../app/common/form/MyCustomTxt';
import { AppApiAction, AttachmentDetails, Customer, Attachment } from './AppApi';
import { AppStatusListContext } from '../AppStatusList/AppStatusListStore';
import { AppApiContext } from './AppApiStore';
 
interface DetailParms {
  id: string;
}
const AppApiEdit: React.FC = () => { 

  const FlowId = 1;
  const { id } = useParams<DetailParms>();
  const AppStatusListStore = useContext(AppStatusListContext);
  const AppApiStore = useContext(AppApiContext);
 
  let history = useHistory();
  const [error, setError] = useState('');
  const [actionId, setActionId] = useState(0);
  const [item, setItem] = useState(new Customer());
  const [loading, setLoading] = useState(true);
  const [attachFileList, setFileList] =useState<Attachment[]>([]);
  const [ActionComment, SetActionComment] = useState("");
  
   
  useEffect(() => {
    //debugger;     
    AppStatusListStore.getStatusList(1);


    var IdVal =0;
    if (id) { IdVal=Number(id); }
    AppApiStore.getActions(FlowId,IdVal).then( (res) => { 
      //debugger;
        if((res as any).errors){          
          setError( error + ", " + (res as any).errors.Error);         
          return;
        }
    });

    if(id){
      setLoading(true);



      
      let act: AppApiAction = new AppApiAction()
      act.ActionId = 10;  
      act.ItemId = Number(id);
      act.Parm1 = id;
      //act.ReturnFlow = id ? 'update' : 'create';

      let formData = new FormData();
      formData.append('ActionId', '10' );
      formData.append('ItemId',  id );
      formData.append('Parm1',  id );

      AppApiStore.ExecuteAction(formData).then( (res) => {      
        //debugger;
        if((res as any).errors){          
          setError((res as any).errors.Error);         
          return;
        }
        else{                 
          setItem(res.Result1[0] as any);

          res.Result1[0].InitAttachment?.forEach( x => {
            attachFileList.push( new Attachment( {file:  new Blob(), Details : x as any } ))
          });
          
          setFileList(attachFileList);
        }  
        setLoading(false);
      });
    }
    else{
      setItem(new Customer()); 
      setLoading(false);
    }
  }, [id, error, AppApiStore.ExecuteAction , AppApiStore.getActions, AppApiStore, AppStatusListStore, attachFileList]);


  const onItemSubmit = (values: any) => {    
    
    
    // let colMap = new Map([
    //   ["Id", "Id"], 
    //   ["CustomerName", "Txt1"], 
    //   ["CIF", "Num1"]
    // ]);  

    // interface LooseObject {
    //   [key: string]: any
    // }
    // var dataParm: LooseObject = {};    
    // Object.keys(values).forEach(function(key,index) {          
    //   if( colMap.get(key) && values[key] ){        
    //     dataParm[ colMap.get(key) as string ] =  values[key] ;
    //   }      
    // });

    debugger;
    let act: AppApiAction = new AppApiAction()
    act.ActionId = actionId;

    values.InitAttachment = [];

    let formData = new FormData();
    attachFileList.forEach( f => {
      values.InitAttachment.push(f.Details);
      formData.append('FileList', f.file, f.Details.FileName);
    });
   
    // if(files){
    //   for(var i=0;i<files.length;i++){

    //     //var f =  file[i] as any;        
    //     formData.append('FileList', files[i]);
        
    //     //values.InitAttachment.push(new Attachment( { Action : 'Create', FileArrayId: i, Id : -1, FileName :  f.name,  Prop1 : 'Desc 1'  }) );
    //   }      
    // }
    // values.InitAttachment = fileDetails;

    formData.append('ActionId', actionId.toString() )
    formData.append('Parm1', JSON.stringify(values) );
    formData.append('ItemId',  values.Id );

    formData.append('Parm2',  ActionComment );

    act.Parm1 = JSON.stringify(values );
    act.ItemId = values.Id; 
//return;

    AppApiStore.ExecuteAction(formData).then( (res) => {      
      //debugger;

      if((res as any).errors){
        setError((res as any).errors.Error);
        setLoading(false);
        return;
      }
      else{
        history.push('/AppApilist');
      }
    });
  };

  
  const prop1Change = (e:any, i:number) => { 
    let files = [...attachFileList];
    files[i].Details.Prop1 = e.target.value;
    setFileList(files);

  }

  const onFileChange = (event:any) => { 
    //debugger;
    
    for(var i=0;i<event.target.files.length;i++){

      var f =  event.target.files[i] as any;    
      var filename = attachFileList.length.toString() + "-" + f.name;
      var attch = new Attachment( { 
          file : f, 
          Details : new  AttachmentDetails({  Action : 'Create', FileArrayId: i, Id : -1, FileName : filename,  Prop1 : 'Desc 1'  }) 
        });
      
      setFileList(currentArray => [...currentArray, attch]);
      event.target.value = null;                        
    }
    //setFileList(attachFileList);

  }

  const download = (id:number, fileName:string) => { 
    let act: AppApiAction = new AppApiAction()
    act.ActionId = 15;  
    act.ItemId = Number(id);
    act.Parm1 = id.toString();

    AppApiStore.FileDownload(act).then( (fileSteam) => { 
      debugger;
      const downloadUrl = window.URL.createObjectURL(new Blob([fileSteam]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();

      debugger;
    });
   
  }


  if(loading){
    return <LinearProgress color="secondary"  className="loaderStyle" /> 
  }
  
  return (
    
    <Container component="main" maxWidth="lg">        
      {error && <div  style={{ color:'red' , fontWeight:'bold', padding:5 , border: '1px solid green', margin:10 }} >{error}</div>}     
    
      {/* <a href="#" onClick={ () => { download(65, "")} } >Test download</a>  */}

      <Formik
          initialValues={item}

          validationSchema={Yup.object({
            CustomerName: Yup.string().required('Title required'),                     
          })}
          onSubmit={onItemSubmit}
        >
          <Form > 
            Status : { AppStatusListStore.itemList.find( s => s.Id === item.StatusId )?.Title }
            <MyCustomTxt   
              name="CustomerName"                         
              type="text"                
              autoFocus={true}
              required={true}                                
              label="CustomerName"                                                                     
            />
              
            <MyCustomTxt   
              name="CIF"                         
              type="number"                
              required={true}                                
              label="CIF"                                                                     
            />
            {item.StatusId === 4 && 
            <MyCustomTxt   
              name="ApprovalComment"                         
              type="text"                
              required={item.StatusId === 4 ? true : false}                                
              label="Approval Comment"                                                                     
            />
            }
            {item.StatusId !== 4 && 
              <div>Approval Comment : {item.ApprovalComment} </div>
            }

            ActionComment: {ActionComment}
            
             <TextField 
              id="ActionComment"
              value={ActionComment} 
              placeholder="ActionComment"            
              type="text"                                     
              variant="outlined"
              margin="normal"                                        
              fullWidth   
              label="Action Comment"  
              multiline={false}
              onChange={ (event) => { 
                debugger;
                SetActionComment(event.target.value);
              } }  
             />

            

  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>       
          <TableCell align="left">File Name</TableCell>
          <TableCell align="left">Comment</TableCell>     
          <TableCell align="left"></TableCell>   
        </TableRow>      
      </TableHead>
      <TableBody>
      { attachFileList && attachFileList.map( (rr, index) => (
          <TableRow>       
            <TableCell align="left"> <a href="#" onClick={ () => { download(rr.Details.Id,  rr.Details.FileName)} } >{rr.Details.FileName}</a> </TableCell>
            <TableCell align="left">
              <input type="text" value={rr.Details.Prop1}  onChange={ (e) => { prop1Change(e,index) } } /> 
            </TableCell>     
            <TableCell align="left"><a href="#">Delete</a></TableCell>      
          </TableRow>
          ))
      } 
      <TableRow>             
        <TableCell align="left" colSpan={3}><input type="file" multiple={false} onChange={onFileChange} /></TableCell>  
      </TableRow>      
      </TableBody>
    </Table>
  </TableContainer>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>   
              <TableCell align="left">Date Time</TableCell>     
                <TableCell align="left">Action By</TableCell>
                <TableCell align="left">Action</TableCell>
                <TableCell align="left">From Status</TableCell>     
                <TableCell align="left">To Status</TableCell> 
                <TableCell align="left">Comment</TableCell>
              </TableRow>      
            </TableHead>
            <TableBody>
            { item.AppHistory.map( (hist, index) => (
                <TableRow> 
                  <TableCell align="left"> {  moment(hist.DateTime).format("DD-MMM-YYYY")  }</TableCell>
                  <TableCell align="left">{hist.ActionBy}</TableCell>
                  <TableCell align="left">{hist.Action}</TableCell>
                  <TableCell align="left">{ AppStatusListStore.AppStatusList.find( s => s.Id === hist.FromStage )?.Title } {hist.FromStage}</TableCell>     
                  <TableCell align="left">{ AppStatusListStore.AppStatusList.find( s => s.Id === hist.ToStage )?.Title } {hist.ToStage}</TableCell> 
                  <TableCell align="left">{hist.Comment}</TableCell>      
                </TableRow>
                ))
            }      
            </TableBody>
          </Table>
        </TableContainer>

  



            {/* <table >
              <tr>
                <td>File Name</td>
                <td>Prop1</td>
                <td></td>
              </tr>
              { attachFileList 
              &&  attachFileList.map( (rr, index) => ( 
              
              <tr key={index}>
                <td>
                  <a href="#" onClick={ () => { download(rr.Details.Id,  rr.Details.FileName)} } >{rr.Details.FileName}</a> 
                </td>
                <td>
                  <input type="text" value={rr.Details.Prop1}  onChange={ (e) => { 
                    debugger;  
                    prop1Change(e,index)
                    } } />                  
                </td>
                <td> <a href="#">Delete</a></td>
              </tr>

            ) ) }
            
            <tr>
              <td colSpan={3}>
                <input type="file" multiple={false} onChange={onFileChange} />
              </td>
            </tr>

            </table> */}

            {/* <input type="file" multiple={true} onChange={onFileChange} />

            <input type="file" multiple={true} onChange={onFileChange} /> */}
                           
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">

                { AppApiStore.actionList.map( (row) => (
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    key={row.Id}
                    onClick={ () => { setActionId( row.Id); }}
                  >
                    {row.Action}
                  </Button> 
                ))}
                
                {/* { item.Id && 
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"                    
                    onClick={ () => {

                      let act: AppApiAction = new AppApiAction()
                      act.ActionId = 11;
                      act.Parm1 = item.Id.toString();
                      AppApiStore.ExecuteAction(act).then( (res) => {      
                        history.push('/AppApilist');    
                      });                      
                    }}
                  >
                    Delete
                  </Button> 
                } */}
                <Button onClick={ () => { history.push('/AppApilist');  }}>Back</Button>          
              </ButtonGroup>

          </Form>
        </Formik>

        
       
    </Container>
  );
};

export default observer(AppApiEdit);

