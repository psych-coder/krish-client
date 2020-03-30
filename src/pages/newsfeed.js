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
import axios from "axios";
import Info1 from '../components/Info/Info1'
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

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
    this.state = { data: [] };
  }

  async componentDidMount() {
    let Parser = require('rss-parser');
      let parser = new Parser()
    const response = await parser.parseURL(CORS_PROXY  + 'http://feeds.feedburner.com/Hindu_Tamil_india');
    const json = response.items
    this.setState({ data: json });
  }

  render() {
    
    return (
      <div>
          {this.state.data.map(el => (
            
            <Info1 key={el.guid} data={el} />
          ))}
        
      </div>
    );
  }
}

export default (withStyles(styles)(NewsFeed));
