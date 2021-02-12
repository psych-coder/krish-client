import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Mui Imports
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    width: "700px",
    height:"700px",    
  },

  box: {
    // height: '100%',
    "width": "500px",
    //"border": "5px solid black",
  },
  media:{
    "max-width": "100%",
    "max-height": "100%",
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
 
});
class MediaPreview extends Component {
  state = {
    open: false,
  };

  
  

  handleClose = (dispatch) => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Dialog maxWidth='md' fullWidth open={this.props.open} onClose={this.handleClose} >  
{/* 
            <div className={classes.root} >
              <img src={this.props.cardImage} alt="Cloudy Sky" />
          </div>
     */}

             <DialogTitle onClose={this.props.handleClose} >
              <Typography variant="h6">Image</Typography>
           
                <IconButton className={classes.closeButton} aria-label="close" onClick={this.props.handleClose}>
                  <CloseIcon />
                </IconButton>
           
            </DialogTitle>
                      
            <CardMedia className={classes.media1}  component="img" image={this.props.cardImage} />
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(MediaPreview);
