import React, { Fragment, Component } from "react";
import MyButton from "../../../util/MyButton";
import { inlineStyles } from "./constant";
import { RichUtils } from "draft-js";


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

export default RenderInlineStyle;
