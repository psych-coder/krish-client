import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue, deepOrange } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

const styles = theme => ({
  root: {
    maxWidth: 700,
    margin: "auto",
    "margin-bottom" : "30px"
  },
  media: {
    height: 0,
    margin: "auto",
    //width:'500px',
    //margin:"10%",
    paddingTop: "30%"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    //color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: blue[500]
  }
});

class Info1 extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      setExpanded: ""
    };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  readString = (url) => {
    axios.get(CORS_PROXY + url).then(res => console.log(res))
  }
  render() {
    dayjs.extend(relativeTime);
    const { classes } = this.props;
   
 /*    const imageAvaliable =  this.props.image !== "" ? (
      <CardMedia
        className={classes.media}
        image={this.state.image}
      />
    ) : null;
 */
   //console.log(this.readString(this.props.data.link));

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              U
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.data.title}
          subheader={dayjs(this.props.data.pubDate).fromNow()}
        />
     

      </Card>
    );
  }
}



export default (withStyles(styles)(Info1));
