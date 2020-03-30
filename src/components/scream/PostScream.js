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

import { postInfo,clearErrors } from "../../redux/actions/dataActions";

const styles = them => ({
  ...them.spreadThis,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
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
      this.setState({ body: '', title:'',  open: false, errors:{}});
    }
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
      this.props.postInfo({title:this.state.title,body: this.state.body,tags: this.state.tags,topic: this.state.topic, editorpick:this.state.editorpick});
      window.history.pushState(null,null,'/kurangu');
    } 
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
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
                name="tags"
                type="text"
                label="Tags"
                multiline
                placeholder="Tags"
                errors={errors.tags ? true : false}
                helperText={errors.tags}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="topic"
                type="text"
                label="Topic"
                multiline
                placeholder="Topic"
                errors={errors.topic ? true : false}
                helperText={errors.topic}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="body"
                type="text"
                label="Content"
                multiline
                rows="3"
                placeholder="Admin post your content"
                errors={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
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
  loading: PropTypes.object
};
const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postInfo,clearErrors }
)(withStyles(styles)(PostScream));
