import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Mui Imports
import withStyles from "@material-ui/core/styles/withStyles";
import MediaView from "./MediaView";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import ActionMenu from "../Menu/ActionMenu";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";

import { connect } from "react-redux";
import { getPost, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    width: "700px",
    height: "700px",
  },

  box: {
    // height: '100%',
    "width": "500px",
    //"border": "5px solid black",
  },
  media: {
    width: "300px",
    //"display": "block"
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  }

});
class InfoDialog extends Component {
  state = {
    dialogOpen: false,
    oldPath: '',
    newPath: ''
  };


  handleOpen = () => {

    let oldPath = window.location.pathname;

    //const { informationId } = this.props.dialog.informationId;
    const newPath = `/i/${this.props.dialog.informationId}`;

    if (oldPath === newPath) oldPath = `/`;
    window.history.pushState(null, null, newPath);

    if (this.props.open) {
      this.setState({ dialogOpen: true, oldPath, newPath });
    }
    //this.props.getPost(informationId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ dialogOpen: false });
    this.props.clearErrors();
  };



  render() {
    const {
      classes,
      /* information: {
        informationId,
        title,
        body,
        createdAt,
        cardImage,
        shortDesc,
        youtubid,
      }, */
      UI: { loading }
    } = this.props;


    const dialogMarkup = loading ? (<div className={classes.spinnerDiv}>
      <CircularProgress size={50} thickness={2} />
    </div>) : (<Dialog maxWidth='md' fullWidth open={this.state.dialogOpen} onClose={this.handleClose} >

      <DialogTitle onClose={this.handleClose} >
        <Typography variant="h6">{this.props.dialog.title}</Typography>

        <IconButton className={classes.closeButton} aria-label="close" onClick={this.handleClose}>
          <CloseIcon />
        </IconButton>

      </DialogTitle>
      {/* <CardMedia component="img" height="200" image={this.props.i.cardImage} /> */}
      <MediaView cardImage={this.props.dialog.cardImage} youtubid={this.props.dialog.youtubid} />

      <DialogContent>
        <Typography paragraph>{this.props.dialog.bodyMarkup}</Typography>
      </DialogContent>
    </Dialog>)

    return (
      <Fragment>

        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              U
            </Avatar>
          }
          action={
            <ActionMenu
              showMenu={this.props.dialog.authenticated}
              informationId={this.props.dialog.informationId}
            //information={this.props.information}
            />
          }
          title={this.props.dialog.title}
          subheader={this.props.dialog.createdAt}
          onClick={this.handleOpen}
        />

        {dialogMarkup}
      </Fragment>
    );
  }
}



InfoDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  informationId: PropTypes.string.isRequired,


  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  information: state.data.information,
  UI: state.UI
});

const mapActionsToProps = {
  getPost, clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(InfoDialog));