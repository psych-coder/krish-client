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

//icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from '@material-ui/core/IconButton';

import { postInfo, clearErrors } from "../../redux/actions/dataActions";


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
 
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleOpen = (dispatch) => {
    this.setState({ open: true });
    
  };
  handleClose = (dispatch) => {
    console.log(this.props.imageloading);
    console.log(this.state.open);

    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
    
  };


  handleSubmit = (event,editorState) => {
    event.preventDefault();
    console.log(convertToHTML(editorState.getCurrentContent()));
    //console.log(getInfo.getFirstline(editorState));
    let rawContent = convertToRaw(editorState.getCurrentContent())
    let htmlContent = convertToHTML(editorState.getCurrentContent());

    console.log(getInfo.getTitle(rawContent));
    console.log(getInfo.getShortDesc(rawContent));
    console.log(getInfo.getHashTags(htmlContent));
    console.log(this.props.data.imagedetails);


     this.props.postInfo({
      title: getInfo.getTitle(rawContent),
      body: htmlContent,
      //tags: getInfo.getHashTags(htmlContent),
     

      cardImage: this.props.data.imagedetails.imageURl,
      shortDesc: getInfo.getShortDesc(rawContent),
      editorpick: this.state.editorpick,
      imageName: this.props.data.imagedetails.filename,
    });  
    window.history.pushState(null, null, "/kurangu");
  };
  render() {
    const { errors } = this.state;

    const {
      classes,
      UI: { imageloading,loading },
    } = this.props;


    //const { cardImage, filename } = this.props.data;
  
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a news">
          <AddIcon />
        </MyButton>
        <Dialog open={this.state.open || imageloading } onClose={this.handleClose} fullWidth>
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
              
              <MyEditor handleSubmit={this.handleSubmit} loading={loading} imageloading={imageloading}/>
        
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
};
export default connect(
  mapStateToProps,
  mapsActionsToProps
)(withStyles(styles)(PostScream));
