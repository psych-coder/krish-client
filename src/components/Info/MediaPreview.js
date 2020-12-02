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
    width: "600px",
    height:"600px",    
  },

  box: {
    // height: '100%',
    "width": "500px",
    //"border": "5px solid black",
  },
  media:{
    "max-width": "100%",
    "max-height": "100%",
  }
 
});
class MediaPreview extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Dialog   open={this.props.open} onClose={this.handleClose} >
        

            {/* <CardMedia className={classes.media1}  component="img" image={this.props.cardImage} /> */}

            <div className={classes.root} >
              <img src={this.props.cardImage} alt="Cloudy Sky" />
          </div>
    

            {/*   <DialogTitle onClose={this.props.handleClose}>
              <Typography variant="h6">Image</Typography>
              {this.onClose ? (
                <IconButton aria-label="close" onClick={this.props.handleClose}>
                  <CloseIcon />
                </IconButton>
              ) : null}
            </DialogTitle>
            <MyButton tip="Close" onClick={this.props.handleClose}>
              <CloseIcon />
            </MyButton> */}
         
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(MediaPreview);
