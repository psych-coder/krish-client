import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getTags } from "../../redux/actions/dataActions";
import withStyles from "@material-ui/core/styles/withStyles";
import { indigo } from "@material-ui/core/colors";

const styles = (theme) => ({
  ulClass: {
    color: indigo[500],
    "list-style-type": "none",
    "margin-left": "20px",
  },
  liClass: {
    padding: "3px",
  },
  background: {
    "background-color": "#e9ebee",
  },
});

class Tags extends Component {
  componentDidMount() {
    this.props.getTags();
  }

  handleListItemClick = (event, tag) => {
    this.setState({ selectedTag: tag });
  };
  constructor() {
    super();
    this.state = {
      selectedTag: "All",
    };
  }
  render() {
    const { classes } = this.props;
    const { tags, loading } = this.props.data;
    console.log(tags);

    //const bgClass = selected={this.state.selectedTag===t.tag}

    const tagItems = tags.map((t, index) => (
     <a href={`/info/${t.tag}`} >
        <li
          key={index}
          className={classes.liClass}
        
        >
       
        {t.tag}
        </li>
        </a>
    
    ));
    return (
      <ul component="nav" className={classes.ulClass}>
        <a href="/" >
          {" "}
          <li
            className={classes.liClass}
          
          >
            All
          </li>
          </a>
        {tagItems}
      </ul>
    );
  }
}

Tags.propTypes = {
  getTags: PropTypes.func.isRequired,
  data: PropTypes.object,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getTags })(withStyles(styles)(Tags));
