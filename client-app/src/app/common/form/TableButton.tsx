
import { Button } from "@material-ui/core";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";

interface Parms {
    label : string;
    path : string;
  }

const TableButton: React.FC<Parms> = ({ label,path }) => {

    let history = useHistory();

    const navigateToPath = (path:string) => {        
        history.push(path); 
    };

    return (
        <span className="TableButton"  onClick={ () => navigateToPath(path)}>{label}</span>        
    )
}

export default TableButton;