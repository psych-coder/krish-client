import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//redux
import { connect } from "react-redux";
import MyButton from "../../util/MyButton";
import MyEditor from "../Editor/MyEditor";
import { convertToHTML } from 'draft-convert';
import { convertToRaw } from "draft-js";
import  getInfo  from '../../util/getInfo';

//Mui Imports
import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

//icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from '@material-ui/core/IconButton';

import { postInfo, clearErrors } from "../../redux/actions/dataActions";
import { uploadImage } from "../../redux/actions/dataActions";



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
  closeButton:{
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});
class PostScream extends Component {
  state = {
    open: false,
    body: "",
    title: "",
    topic: "",
    tags: "",
    editorpick: false,
    errors: {},
  };
  componentWillReceiveProps(nextprops) {
    if (nextprops.UI.errors) {
      this.setState({ errors: nextprops.UI.errors });
    }
    if (!nextprops.UI.errors && !nextprops.UI.loading) {
      this.setState({ body: "", title: "", file: "", open: false, errors: {} });
    }
  }
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
    this.setState({ open: true, errors: {} });
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleSubmit = (event,editorState) => {
    event.preventDefault();
    console.log(convertToHTML(editorState.getCurrentContent()));
    //console.log(getInfo.getFirstline(editorState));
    let rawContent = convertToRaw(editorState.getCurrentContent())

    console.log(getInfo.getTitle(rawContent));
    console.log(getInfo.getShortDesc(rawContent));
    
    /*  this.props.postInfo({
      title: getInfo.getTitle(rawContent);
      body: this.state.body,
      tags: this.state.tags,
      topic: this.state.topic,
      cardImage: "",
      editorpick: this.state.editorpick,
    });  */
    window.history.pushState(null, null, "/kurangu");
  };
  render() {
    const { errors } = this.state;

    const {
      classes,
      UI: { loading },
    } = this.props;

    const { cardImage } = this.props.data;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a news">
          <AddIcon />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth>
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
              
              <MyEditor handleSubmit={this.handleSubmit} />
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postInfo: PropTypes.func.isRequired,
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
  clearErrors,
  uploadImage,
};
export default connect(
  mapStateToProps,
  mapsActionsToProps
)(withStyles(styles)(PostScream));
