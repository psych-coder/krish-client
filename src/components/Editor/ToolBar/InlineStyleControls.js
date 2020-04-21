import React, { Fragment } from "react";
import SButton from './SButton'
import FormatBold from "@material-ui/icons/FormatBold";
import FormatUnderlined from "@material-ui/icons/FormatUnderlined";
//import FormatColorTextIcon from "@material-ui/icons/FormatColorText";
import FormatItalic from "@material-ui/icons/FormatItalic";

var inlineStyles = [
  {
    label: "bold",
    style: "BOLD",
    icon: <FormatBold />,
  },
  {
    label: "italic",
    style: "ITALIC",
    icon: <FormatItalic />,
  },
  {
    label: "underline",
    style: "UNDERLINE",
    icon: <FormatUnderlined />,
  },
];


class InlineStyleControls extends React.Component {
     
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
export default InlineStyleControls;
