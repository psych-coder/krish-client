import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import InfoSkeleton from '../util/InfoSkeleton'

import { connect } from "react-redux";
import { getNewsFeed } from "../redux/actions/dataActions";

const styles = theme => ({
  root: {
    maxWidth: 700,
    margin: "auto",
    "margin-bottom": "30px"
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

class NewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      link: "",
      pubDate: "",
      creator: "",
      content: "",
      contentSnippet: "",
      guid: "",
      categories: ""
    };
  }

  componentDidMount() {
    this.props.getNewsFeed();
  }

  render() {
    dayjs.extend(relativeTime);
    const { classes } = this.props;

    
    const {  newsFeed, loading } = this.props.data;
    console.log("======");
    let f = newsFeed;
    console.log(f);
    
    
    return (
       <div>{newsFeed} </div>
          
      );
    }
  

}

NewsFeed.propTypes = {
    data: PropTypes.object,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
  });

export default connect(mapStateToProps, { getNewsFeed })(
  withStyles(styles)(NewsFeed)
);
