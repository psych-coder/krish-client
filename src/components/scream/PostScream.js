import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//redux
import { connect } from "react-redux";
import MyButton from "../../util/MyButton";

//Mui Imports
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

//icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from '@material-ui/icons/Edit';

import { postInfo,clearErrors } from "../../redux/actions/dataActions";
import {uploadImage } from '../../redux/actions/dataActions';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const styles = theme => ({
  ...theme.spreadThis,
  imgRoot: {
    maxWidth: 150,
  },
  imgMedia: {
    height: 0,
    margin: "auto",
    //width:'500px',
    //margin:"10%",
    padding: "30%"
  },
});
class PostScream extends Component {
  state = {
    open: false,
    body: "",
    title:"",
    topic:"",
    tags:"",
    editorpick:false,
    errors: {}
  };
  componentWillReceiveProps(nextprops){
    
    if(nextprops.UI.errors){
      this.setState({errors: nextprops.UI.errors});
    }
    if(!nextprops.UI.errors && !nextprops.UI.loading){
      this.setState({ body: '', title:'', file:'', open: false, errors:{}});
    }
  }
  handleImageChange = (event) => {
   
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image',image,image.name);
    this.props.uploadImage(formData);
    this.setState({ open: true, errors:{} });
  }
  handleEditPicture = () =>{
   
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }
  handleChange = (event) => {
    
    this.setState({ [event.target.name]: event.target.value });
  };
  handleOpen = () => {
    
    this.setState({ open: true });
  };
  handleClose = () => {
    
    this.props.clearErrors();
    this.setState({ open: false, errors:{} });
  };
  handleSubmit = (event) => {
  
      event.preventDefault();
      this.props.postInfo({title:this.state.title,body: this.state.body,tags: this.state.tags,topic: this.state.topic, cardImage:this.props.data.cardImage ,editorpick:this.state.editorpick});
      window.history.pushState(null,null,'/kurangu');
    } 
  render() {
    const { errors } = this.state;
    
    const {
      classes,
          UI: { loading }
    } = this.props;

    const {
      cardImage,
    } = this.props.data;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a news" >
        <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth="sm"
          fullWidth
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Information</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
            <TextField
                name="title"
                type="text"
                label="Title"
                multiline
                placeholder="Title"
                errors={errors.title ? true : false}
                helperText={errors.title}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
             
              <TextField
                name="body"
                type="text"
                label="Content"
                multiline
                rows="10"
                placeholder="Admin post your content"
                errors={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                
              />
              <div className="image-wrapper">
              
              <input type="file" name="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
              
             <MyButton tip="Upload Image" onClick={this.handleEditPicture}  btnClassName='button'>
               <EditIcon color='primary' />
              </MyButton>
              <Card className={classes.imgRoot}>
                <CardMedia className={classes.imgMedia}
                image={cardImage} 
                />
              </Card>
            </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
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
  uploadImage: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  UI: state.UI,
  data:state.data
});

const mapsActionsToProps = {
  postInfo,
  clearErrors,
  uploadImage
}
export default connect(mapStateToProps,mapsActionsToProps)(withStyles(styles)(PostScream));
