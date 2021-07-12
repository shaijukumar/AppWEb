import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";


interface Parms {
    tableId : number;  
  }

const TableDetails: React.FC<Parms> = ({ tableId }) => {

    let history = useHistory();

    const navigateToPath = (path:string) => {        
        history.push(path); 
    };

    return (
        <Grid container spacing={1} style={{width:'800px'}}>
             <Grid item xs={2}>
                <Button onClick={ () => navigateToPath(`/AppTableMasterItemEdit/${tableId}`)} variant="contained" size="small" color="primary">Columns</Button>
             </Grid>

             <Grid item xs={2}>
                <Button onClick={ () => navigateToPath(`/AppTableMasterItemEdit/${tableId}`)} variant="contained" size="small" color="primary">Status List</Button>
             </Grid>

             {/* <Grid item xs={1}>
                <Button onClick={ () => navigateToPath(`/AppTableMasterItemEdit/${tableId}`)} variant="contained" size="small" color="primary">Columns</Button>
             </Grid>         */}
        </Grid>

        
    );
}
 
export default TableDetails;