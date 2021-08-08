
import { makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { AppTheme } from "../Theme";

interface Parms {
    label : string;
    path ?: string;    
    BackgroundColor ?: string;
    TextColor?: string;
  }

 
const TableButton: React.FC<Parms> = ({ label,path, BackgroundColor, TextColor }) => {

    
    const useStyles = makeStyles({
        root: {
            fontSize: AppTheme.ActionButtonFontSize,
            color: TextColor ? TextColor :  AppTheme.ActionButtonColor,
            backgroundColor : BackgroundColor ? BackgroundColor : AppTheme.ActionButtonBackgroundColor,
            borderRadius : '10px',        
            padding: '10px',          
        },
      });
     
    let history = useHistory();
    const classes = useStyles();

    const navigateToPath = (path:string) => {        
        history.push(path); 
    };

    return (
        <>
        {path && 
            <span className={classes.root}  onClick={ () => navigateToPath(path)}>{label}</span>  
        } 
        {!path && 
            <span className={classes.root}  >{label}</span> 
        } 
        </>    
    )
}

export default TableButton;