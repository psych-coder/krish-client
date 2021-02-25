import React, { Component, Fragment } from "react";

//Mui Imports
import withStyles from "@material-ui/core/styles/withStyles";

import MediaPreview from "../Info/MediaPreview";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import ReactPlayer from 'react-player';

const styles = (theme) => ({
  ...theme.spreadThis,

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
      <ReactPlayer url={`https://www.youtube.com/watch?v=${this.props.youtubid}`} width='100%'
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
