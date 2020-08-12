import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import AppIcon from "../../images/logo.png";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
 
  root: {
    flexGrow: 21,
    background: "#FFF",
    //height: "75px",
    marginTop: "25px",
    //maxWidth:"50%",
  },
  text: {
    margin: "25px",
  },
  imageGrid: {
    "flex-basis": "10%",
  },

  image1: {
    height: 0,
    //width:'500px',
    //margin:"10%",
    padding: "50%",
  },
  progressSpinner:{
    position: 'absolute'
  }
});
class ImgCard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item sm={3} className={classes.imageGrid}>
          <Card>
         {/*  {this.props.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )} */}
            <CardMedia
              image={this.props.image}
              title="An image"
              className={classes.image1}
            />
              
          
          </Card>
        </Grid>
        <Grid item className={classes.text}>
          {this.props.filename}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImgCard);
