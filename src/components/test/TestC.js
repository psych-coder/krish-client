import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";




class TestC extends Component {
  

  
  render() {
   
    
    return (
        <div><span>{this.props.count}</span></div>
    )
  }
}

TestC.propTypes = {
  information: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(TestC);
