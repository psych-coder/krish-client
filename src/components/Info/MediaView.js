import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Mui Imports
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

import MediaPreview from "../Info/MediaPreview";

import CardMedia from "@material-ui/core/CardMedia";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import ReactPlayer from 'react-player';

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    width: "700px",
    height:"700px",    
  },

  box: {
    // height: '100%',
    "width": "500px",
    //"border": "5px solid black",
  },
  media:{
    "max-width": "100%",
    "max-height": "100%",
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
 
});
class MediaView extends Component {
  constructor(props) {
    super();
    this.state = {
      
      open: false,
    };

    this.handleClose = () => this._handleClose();
  }
  

  handleMediaClick = () => {
    this.setState({ open: true });
  };

  _handleClose = (dispatch) => {
    this.setState({ open: false });
  };
  render() {
    //const { classes } = this.props;
    
    const imageAvaliable =
    this.props.cardImage !== undefined && this.props.cardImage.trim() !== "" ? (
      <CardActionArea onClick={this.handleMediaClick}>
        <CardMedia component="img" height="300" image={this.props.cardImage} />
      </CardActionArea>
    ) : null;

    const video = this.props.youtubid !== undefined && this.props.youtubid.trim() !== "" ? (     
         <ReactPlayer url={ `https://www.youtube.com/watch?v=${this.props.youtubid}`} width='100%'
         />
    ) : null;

    return (
      <Fragment>
        {imageAvaliable}
        {video}
        <MediaPreview
          cardImage={this.props.cardImage}
          open={this.state.open}
          handleClose={this.handleClose}
        /> 
      </Fragment>
    );
  }
}

export default withStyles(styles)(MediaView);
