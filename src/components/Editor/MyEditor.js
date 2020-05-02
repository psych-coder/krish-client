import React from "react";
import { Editor, EditorState, RichUtils, ContentState } from "draft-js";

import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import InlineStyleControls from "./ToolBar/InlineStyleControls";
import BlockStyleControls from "./ToolBar/BlockStyleControls";
import Button from "@material-ui/core/Button";
import MyButton from "../../util/MyButton";
import EditIcon from "@material-ui/icons/Edit";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const styles = (theme) => ({
  ...theme.spreadThis,

  root: {
    "margin-left": "10px",
    // "margin-top": "100px",
    border: "1px solid rgb(202, 202, 202);",
    //width: "50%",
    "background-color": "white",
  },

  toolbar: {
    "border-bottom": "1px solid rgb(202, 202, 202);",
    width: "100%",
    padding: "10px",
  },
  submit: {
    "border-top": "1px solid rgb(202, 202, 202);",
    width: "100%",
    height: "3rem",
    //padding: "10px",
  },
  draft: {
    //"border": "1px solid rgb(202, 202, 202);",
    width: "100%",
    padding: "10px",
    "margin-right": "10px",
    //height: "max-content",
  },
  submitB: {
    float: "right",
    "margin-right": "5px",
    "margin-top": "10px",
  },
  imgRoot: {
    maxWidth: 150,
  },
  imgMedia: {
    height: 0,
    margin: "auto",
    //width:'500px',
    //margin:"10%",
    padding: "30%",
  },
});
class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  clearContent = (editorState) => {
    editorState = EditorState.push(
      this.state.editorState,
      ContentState.createFromText("")
    );
    this.setState({ editorState });
  };

  handleSubmit = (event) => {
    console.log(this.state.editorState);
    this.props.handleSubmit(event,this.state.editorState);
  };
  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { classes } = this.props;
    const { editorState } = this.state;

    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <div className="RichEditor-root">
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Post a content..."
            ref="editor"
            spellCheck={true}
          />
        </div>
        <div className={classes.submit}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitB}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="contained"
            color="light"
            className={classes.submitB}
            onClick={this.clearContent}
          >
            Clear
          </Button>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: "Aerial",
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}
export default withStyles(styles)(MyEditor);
