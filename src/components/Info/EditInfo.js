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
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import {deletePost} from '../../redux/actions/dataActions'

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
      }
}
 class EditInfo extends Component {

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
               <MyButton tip="Edit Post"
                >
                <EditOutlinedIcon color="primary" /> 
                </MyButton> 
                
           </Fragment>
        )
    }
}

EditInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    deleteScream: PropTypes.func.isRequired
 };

export default connect(null,{deletePost})(withStyles(styles)(EditInfo));
