import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InfoDialog from "../Info/InfoDialog";
import { BrowserRouter as Router, Route } from "react-router-dom";



export default function DynamicCSS() {
  
  return (
    <React.Fragment>
      <Switch >
        <Route exact path="/i/:id" children={<InfoDialog />} />
        
      </Switch>
      <InfoDialog
        authenticated = {true}
        informationId = "12121"
        dialogopen={true}
        //handleDialogClose={this.handleDialogClose}
        />
    </React.Fragment>
  );
}
