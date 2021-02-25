import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import AppIcon from "../../images/logo.png";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  root: {
    flexGrow: 21,
    background: "#FFF",
    //height: "75px",
    marginTop:"25px"
    //maxWidth:"50%",
  },
  text: {
    margin:"25px"
  },
  imageGrid:{
  
    background:"#FFF"
  },
 
  image1: {
    height: 0,
    //width:'500px',
    //margin:"10%",
    padding: "30%",
  },
});
class ImgCard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} spacing={1}  >
        <Grid item  sm={3} className={classes.imageGrid} >
            <Card  >
              <CardMedia
                image={AppIcon}
                title="Paella dish"
                className={classes.image1}
              />
              </Card>
          </Grid>
          <Grid item  sm={7} className={classes.text}  >
            testvsdf
          </Grid>
        </Grid>
     
    );
  }
}

export default withStyles(styles)(ImgCard);
