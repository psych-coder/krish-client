import React, { Fragment } from "react";
import SButton from './SButton';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import CodeIcon from '@material-ui/icons/Code';

const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
    { label: "Blockquote", style: "blockquote" },
    { label: "UL", style: "unordered-list-item", icon: <FormatListBulletedIcon /> },
    { label: "OL", style: "ordered-list-item",icon: <FormatListNumberedIcon />},
    { label: "Code Block", style: "code-block", icon: <CodeIcon/>},
  ];
  
  class BlockStyleControls extends React.Component {
    render() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  
    return (
      <Fragment>
        {BLOCK_TYPES.map((type) => (
          <SButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={this.props.onToggle}
            style={type.style}
            icon={type.icon}
          />
        ))}
        </Fragment>
    );
        }
  };

  export default BlockStyleControls;