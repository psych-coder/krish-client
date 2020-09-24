import React, { Component, Fragment } from "react";
import MyButton from "../../util/MyButton";

//redux

import { connect } from "react-redux";
//import { likeScream, unLikeScream } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";

//Mui
import { withStyles } from "@material-ui/core";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import {deletePost} from '../../redux/actions/dataActions'

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
      }
}
 class DeleteInfo extends Component {

    state = {
        open: false
    }
    handleOpen =()=>{
        this.setState({open:true});
    }
    handleClose =()=>{
        this.setState({open:false});
    }
   deletePost = () =>{
       console.log(this.props.infoId);
       this.props.deletePost(this.props.infoId);
       this.setState({open:false});
   }

    render() {
        const {classes} = this.props; 
        console.log(this.props.infoId);
        return (
           <Fragment>
               <MyButton tip="Delete Post"
                onClick = {this.handleOpen}
                >
                <DeleteOutline color="secondary" /> 
                </MyButton> 
                <Dialog 
                 open={this.state.open}
                 onClose={this.handleClose}
                 fullWidth
                 maxWidth="sm"
                 >
                    <DialogTitle>
                        Are you sure want to delete this scream?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" >Cancel</Button>
                        <Button onClick={this.deletePost} color="secondary" >Delete</Button>
                    </DialogActions>
                 </Dialog>
           </Fragment>
        )
    }
}

DeleteInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    deleteScream: PropTypes.func.isRequired
 };

export default connect(null,{deletePost})(withStyles(styles)(DeleteInfo));
