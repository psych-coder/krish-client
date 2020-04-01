import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getInformation } from "../redux/actions/dataActions";
import TestC from "../components/test/TestC";
import { Button } from "@material-ui/core";

class Test extends Component {
    state = {
        count: 1
      };

    handleClick = () => {
        //let i  = this.state.count.lastIndexOf()
        this.setState({count : this.state.count+ 1});    
    }
  render() {
   
    console.log(this.state.count)
    let stream =  <TestC key={this.state.count} count={this.state.count} />

    return (
      <div>
        {stream}
        <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={this.handleClick}
              >Click</Button>
      </div>
  )
    }
}



export default Test;
