import React, { Component } from "react";
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
    "padding-left": "0px",
  },
  liClass: {
    padding: "10px",
    color: "#4b4b4b",
    "font-weight": "500",
  },
  active: {
    padding: "10px",
    //"background-color": "darkblue"
    "font-weight": "bold",
   //"background-color" : "#eaf3ff",
   "font-size": "22px",
   color: "#4181db" ,
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

    console.log("--------------Gokul-------");
    console.log(window.location.pathname);

    //const bgClass = selected={this.state.selectedTag===t.tag}

    const tagItems = tags.map((t, index) => (
     <a href={`/info/${t.tag}`} >
        <li
          key={index}
          
          className={window.location.pathname===`/info/${t.tag}` ? ( classes.active ) : classes.liClass }
        >
       
        {t.tag}
        </li>
        </a>
    
    ));
    return (
      <ul component="nav"  className={classes.ulClass} id="tags">
      <a href="/" >
        {" "}
        <li className={ window.location.pathname==="/" ?(classes.active ):(classes.liClass)} >
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
