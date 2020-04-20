import React, { Fragment } from "react";
import { inlineStyles } from "./constant";
import SButton from './SButton'

class ToolBar extends React.Component {
     
  render() {
    var currentStyle = this.props.editorState.getCurrentInlineStyle();
    return (
      <Fragment>
      {inlineStyles.map((type) => (
          <SButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            style={type.style}
            onToggle={this.props.onToggle}
            icon={type.icon}
          />
        ))}
      </Fragment>
    );
  }
}
export default ToolBar;
