import React, { Component } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import InfiniteScroll from "react-infinite-scroll-component";





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
            <div className={classes.styles} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default withStyles(styles)(Loading);