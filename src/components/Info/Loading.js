import React, { Component } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import InfiniteScroll from "react-infinite-scroll-component";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import PropTypes from "prop-types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MediaView from "./MediaView";
import InfoDialog from "./InfoDialog";
import { FacebookShareButton, FacebookIcon } from "react-share";


const styles = (theme) => ({
  styles: {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  }
});


class Loading extends Component {

  constructor() {
    super();
    this.state = {
      maintemp: "",
      desc: "",
      city: "",
      items: Array.from({ length: 20 }),
      dialogopen: false,
      expanded: false,
      setExpanded: "",
      //open: false,
      informationId: "",
      title: "",
      body: "",
      createdAt: "",
      cardImage: "",
      shortDesc: "",
      youtubid: ""
    }
  }


  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 5 }))
      });
    }, 1500);
  };

  render() {
    const { classes } = this.props;



    return (
      <div>

        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((i, index) => (
            <Card className={classes.root} variant="outlined">



              <Collapse in={!this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent in={this.state.expanded.toString()}>
                  <Typography paragraph color="textPrimary" component="p">
                    test
                  </Typography>
                </CardContent>
              </Collapse>

              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent >
                  <Typography paragraph>test</Typography>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default withStyles(styles)(Loading);