import React, { Fragment } from "react";
import PropTypes from "prop-types";

//Mui
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";


import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  ...theme.spreadThis,
  root: {
    //maxWidth: 700,
    margin: "auto",
    "margin-bottom" : "30px",
    "box-shadow":"none",
    "border": "1px solid rgb(202, 202, 202);"
  },
});

const InfoSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card key={index} className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {" "}
            U{" "}
          </Avatar>
        }
        title="Loading..."
        subheader="Loading..."
      />
      <CardContent >
        <Typography color="textPrimary" component="p" >
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <div className={classes.halfLine} />
        </Typography>
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};
InfoSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoSkeleton);
