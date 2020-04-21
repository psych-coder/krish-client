import React from "react";
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from "@material-ui/core/IconButton";

const styles = {
    buttonC: {
      "border-radius": "10%",
      "margin-right":"2px",
      "font-weight": "bold",
      "font-size": "medium",
     // padding: "5px",
  
      "&:hover": {
        "background-color": "#FEEFC2",
      },
      
    },
    buttonA: {
      "border-radius": "10%",
     // padding: "5px",
      "background-color": "#FEEFC2",
      "margin-right":"2px",
      "font-weight": "bold",
      "font-size": "medium",
    },
  };
  class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }
  
    render() {
        const {classes} = this.props;

      let className = classes.buttonC;
      if (this.props.active) {
        className = classes.buttonA;
      }
  
      return (

         
        <IconButton className={className} onMouseDown={this.onToggle} size="small">
         {this.props.icon || this.props.label}
        </IconButton>
      );
    }
  }
  export default withStyles(styles)(StyleButton);