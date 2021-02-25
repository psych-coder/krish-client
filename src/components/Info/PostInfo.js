import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//redux
import { connect } from "react-redux";
import MyButton from "../../util/MyButton";
import { Link } from 'react-router-dom';


/* 
import getInfo from "../../util/getInfo";

import MyEditor from "../Editor/MyEditor";
import { convertToHTML } from "draft-convert";
import { convertToRaw } from "draft-js";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

//icons


*/

//Mui Imports
import withStyles from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/Add";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import {
  getPost,
  postInfo,
  clearErrors,
} from "../../redux/actions/dataActions";

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
class PostInfo extends Component {
  state = {
    open: false,
    body: "",
    title: "",
    topic: "",
    tags: "",
    editorpick: false,
    errors: {},
    postConten: "",
  };
  componentWillReceiveProps(nextprops) {
    if (nextprops.UI.errors) {
      this.setState({ errors: nextprops.UI.errors });
    }
    if (!nextprops.UI.errors && !nextprops.UI.loading) {
      this.setState({ body: "", title: "", file: "", open: false, errors: {} });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleOpen = (dispatch) => {
    this.setState({ open: true });
    //this.props.getPost(this.props.infoId);
    //this.setState({ postConten: true });
  };
  handleClose = (dispatch) => {
    // console.log(this.props.imageloading);
    // console.log(this.state.open);

    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  /* handleSubmit = (event, editorState) => {
    event.preventDefault();
   
    let rawContent = convertToRaw(editorState.getCurrentContent());
    let htmlContent = convertToHTML(editorState.getCurrentContent());

   
    this.props.postInfo({
      title: getInfo.getTitle(rawContent),
      body: htmlContent,
      

      cardImage: this.props.data.imagedetails.imageURl,
      shortDesc: getInfo.getShortDesc(rawContent),
      editorpick: this.state.editorpick,
      imageName: this.props.data.imagedetails.filename,
    });
    window.history.pushState(null, null, "/kurangu");
  }; */
  render() {

    let link = this.props.infoId ? `/Editor/${this.props.infoId}` : "/Editor";
    let createEdit = this.props.infoId ? (
      <EditOutlinedIcon color="primary" />

    ) : (
        <AddIcon />
      );

    return (
      <Fragment>
        <Link to={link}>
          <MyButton tip="Post a news">
            {createEdit}
          </MyButton>
        </Link>


        {/*  <Dialog
          open={this.state.open || imageloading}
          onClose={this.handleClose}
          fullWidth
        >
          <DialogTitle onClose={this.handleClose}>
            <Typography variant="h6">Post your content</Typography>
            {this.onClose ? (
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={this.onClose}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <MyEditor
                handleSubmit={this.handleSubmit}
                loading={loading}
                imageloading={imageloading}
                information={this.props.information}
                mode={mode}
              />
            </form>
          </DialogContent>
        </Dialog> */}
      </Fragment>
    );
  }
}

PostInfo.propTypes = {
  postInfo: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.object,
  uploadImage: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

const mapsActionsToProps = {
  postInfo,
  getPost,
  clearErrors,
};
export default connect(
  mapStateToProps,
  mapsActionsToProps
)(withStyles(styles)(PostInfo));
