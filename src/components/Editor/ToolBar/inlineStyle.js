import React, { Fragment, Component } from "react";
import MyButton from "../../../util/MyButton";
import { inlineStyles } from "./constant";
import { RichUtils } from "draft-js";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button } from "@material-ui/core";

const styles = {
  buttonC: {
    "border-radius": "10%",
    padding: "5px",

    "&:hover": {
      "background-color": "rgb(235, 235, 190)",
    },
    "&$isActive":{
      "background-color": "block",
    },
  },
  buttonA: {
    "border-radius": "10%",
    padding: "5px",
    "background-color": "rgb(245, 245, 169)",
  },
};
class RenderInlineStyle extends Component {
  render() {
    const { classes } = this.props;
    const { editorState, updateEditorState } = this.props;

    const applyStyle = (style) => {
      updateEditorState(RichUtils.toggleInlineStyle(editorState, style), style);
    };

    const isActive = (style) => {
      console.log(style);
      const currentStyle = editorState.getCurrentInlineStyle();
      currentStyle.has(style);
      console.log(currentStyle.has(style))
    };
    return (
      <Fragment>
        {inlineStyles.map((item, idx) => {
          return (
            <MyButton
              isActive={isActive(item.style)}
              btnClassName={classes.buttonC}
              name={item.style}
              tip={item.label}
              size="small"
              color="textPrimary"
              onClick={() => applyStyle(item.style)}
            >
              {item.icon || item.label}
            </MyButton>
          );
        })}
      </Fragment>
    );
  }
}

export default withStyles(styles)(RenderInlineStyle);
