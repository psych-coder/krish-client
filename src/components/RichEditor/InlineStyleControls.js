
import React from "react";
import StyleButton from "./StyleButton";
import FormatBold from "@material-ui/icons/FormatBold";

var INLINE_STYLES = [
    { label: "Bold", style: "BOLD",icon: <FormatBold/>, },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    { label: "Monospace", style: "CODE" },
  ];
  
 class InlineStyleControls extends React.Component{

 render(){
    var currentStyle = this.props.editorState.getCurrentInlineStyle();
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={this.props.onToggle}
            style={type.style}
            icon={type.icon}
          />
        ))}
      </div>
    );
        }
  };
  export default InlineStyleControls;