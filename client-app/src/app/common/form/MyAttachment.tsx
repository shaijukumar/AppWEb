
import React, { useContext, useEffect, useState } from "react";
import {  
  useField,
  FieldAttributes,  
} from "formik";

import FormControl from '@material-ui/core/FormControl';

import MaterialTable from "material-table";
import { Button, ButtonGroup, Container, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,  } from '@material-ui/core';
import TableButton from "./TableButton";
import { ApiContext, AppApiAction } from "../../../Portal/Api/Api";

export interface IAttachmentDetails {
	Action: string
	FileArrayId?: number
	Id?: number	
	FileName: string	
	Prop1?: string
	Prop2?: string
	Prop3?: string
	Prop4?: string
	Prop5?: string
}

export class AttachmentDetails implements IAttachmentDetails {
	Action: string = '';
	FileArrayId: number = -1;
	Id: number = -1;	
	FileName: string = '';	
	Prop1: string = '';
	Prop2: string = '';
	Prop3: string = '';
	Prop4: string = '';
	Prop5: string = '';

  constructor(init?: IAttachmentDetails) {
    Object.assign(this, init);
  }
}

export interface IAttachment {
	file: Blob
	//Details : AttachmentDetails
  Action: string
	FileArrayId?: number
	Id?: number	
	FileName: string	
  FilePath: string,
	Prop1?: string
	Prop2?: string
	Prop3?: string
	Prop4?: string
	Prop5?: string
}

export class Attachment implements IAttachment {
	file: Blob = new Blob();
	//Details : AttachmentDetails = new AttachmentDetails();
  Action: string = '';
	FileArrayId: number = -1;
	Id: number = -1;	
	FileName: string = '';	
  FilePath: string = '';	
	Prop1: string = '';
	Prop2: string = '';
	Prop3: string = '';
	Prop4: string = '';
	Prop5: string = '';
	  
  constructor(init?: IAttachment) {
    Object.assign(this, init);
  }
}

type CustomProps = { downloadActionID: number, label?: string, width?: string  } & FieldAttributes<{}>;

const MyAttachment : React.FC<CustomProps> = ({ downloadActionID, label, placeholder, type,required,autoComplete, autoFocus,  width, ...props }) => {
    
    const [field, meta , { setValue }] = useField<{}>(props);
    const [val, setVal] = useState(false);

    const [attachFileList, setFileList] =useState<Attachment[]>([]);

    const ApiStore = useContext(ApiContext);

    useEffect(() => {
      // console.log('MyAttachment useEffect') ;
      // var attach: Attachment[] = [];
      // var att : Attachment = new Attachment();
      // att.Details = new AttachmentDetails();  
      // att.Details.Prop1 = "123";
      // attach.push(att);
      // setValue(attach);   
      // debugger;
      // console.log(field.value)
      
    },[label]);

    // const TableColumns = [     
    //   {title: "Id", field: "Id"},
    //   {title: "File Name", field: "FileName"},   
    //   { title: "Comment", field: "Comment"},           
    // ];

    // const TableActions = [
    //   {          
    //       icon: (values: any) => { return <TableButton  label="Add New" path="/EmployeeEdit" /> },
    //       tooltip: 'Add New',
    //       isFreeAction: true, 
    //       onClick: (event:any) =>{  },                                     
    //   },
    //   {          
    //       icon: (values: any) => { return <TableButton  label="Refresh"  /> },
    //       tooltip: 'Refresh',
    //       isFreeAction: true, 
    //       onClick: (event:any) =>{ console.log(1); },                                     
    //   }
    // ];
    const deleteAttachment = (att:Attachment) => { 

      var attList: Attachment[] = (field.value as Attachment[]);
      for(var i=0;i<attList.length;i++){
        if(att == attList[i]){
          if(att.Id != -1 ){            
            attList[i].Action = "Delete";
          }         
          break;          
        }
      }
      setValue(attList);
    }

    const download = (id:number, fileName:string) => { 
      
      let act: AppApiAction = new AppApiAction()
      act.ActionId = downloadActionID;  
      act.ItemId = Number(id);
      act.Parm1 = id.toString();
  
      ApiStore.FileDownload(act).then( (fileSteam) => { 
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

    const prop1Change = (e:any, i:number) => { 
      debugger;
      let files = [...(field.value as any)];
      files[i].Prop1 = e.target.value;
      files[i].Action = "Update";
      setValue(files);
  
    }

    const onFileChange = (event:any) => { 
      debugger;
      
      for(var i=0;i<event.target.files.length;i++){
  
        var f =  event.target.files[i] as any;    
        var filename = `${field.name}-${(field.value as any).length.toString()}-${f.name}`;
        var attch = new Attachment( { 
            file : f, 
            Action : 'Create', FileArrayId: i, Id : -1, FileName : f.name,  Prop1 : '', FilePath : filename,            
          });
                
        setValue([...(field.value as Attachment[]), attch]);
        setFileList(currentArray => [...currentArray, attch]);
        event.target.value = null;                        
      }        
    }

       
    return (                  
        <FormControl variant="outlined" fullWidth style={{ marginTop : 10 , marginBottom : 10, width:width,  display: 'block'}} >

          {/* <MaterialTable                    
              title={label}
              data={field.value as any}
              columns={TableColumns as any}
              actions={TableActions as any}
              options={{ sorting:false, search: false, paging: false, filtering: false, exportButton: false, pageSize:10,  tableLayout: "auto"}}/> */}

           {/* <FormControlLabel  
                control={<Checkbox {...field}  checked={val} onClick={ () => { setVal(!val);} }  />}
                label={label}              
          /> */}

          <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>             
                    <TableCell align="left" colSpan={3}><input type="file" multiple={false} onChange={onFileChange} /></TableCell>  
                  </TableRow> 
                  <TableRow>       
                    <TableCell align="left">File Name</TableCell>
                    <TableCell align="left">Comment</TableCell>     
                    <TableCell align="left"></TableCell>   
                  </TableRow>      
                </TableHead>
                <TableBody>
                { field.value && (field.value as Attachment[]).map( (rr:Attachment, index:any) => (
                    <TableRow key={index}>       
                      <TableCell align="left"> <a href="#" onClick={ () => { download(rr.Id,  rr.FileName)} } >{rr.FileName}</a> </TableCell>
                      <TableCell align="left">
                        <input type="text" value={rr.Prop1}  onChange={ (e) => { prop1Change(e,index) } } /> 
                        <div> {rr.Action}</div>
                      </TableCell>     
                      {rr.Action != "Delete" && <TableCell align="left"><a  href="#" onClick={() => { deleteAttachment(rr) }} >Delete</a></TableCell>  }
                    </TableRow>
                    ))
                } 
                     
                </TableBody>
              </Table>
            </TableContainer>

        </FormControl>              
    );
  };

export default MyAttachment;
