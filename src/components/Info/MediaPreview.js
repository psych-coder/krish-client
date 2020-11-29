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

const styles = (theme) => ({
  ...theme.spreadThis,
  imgRoot: {
    maxWidth: 150,
  },
  imgMedia: {
    height: 0,
    margin: "auto",
    //width:'500px',
    //margin:"10%",
    padding: "30%",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
class MediaPreview extends Component {
  state = {
    open: false,
  };

  constructor() {
    super();
    this.state = {
      open: true,
    };
  }

  handleClose = (dispatch) => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Fragment>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth>
          <DialogTitle onClose={this.handleClose}>
            <Typography variant="h6">Image</Typography>
            {this.onClose ? (
              <IconButton aria-label="close" onClick={this.onClose}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
          <MyButton tip="Close" onClick={this.handleClose}>
            <CloseIcon />
          </MyButton>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(MediaPreview);
