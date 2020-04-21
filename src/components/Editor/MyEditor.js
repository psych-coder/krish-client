import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

import withStyles from '@material-ui/core/styles/withStyles';

import Grid from "@material-ui/core/Grid";
import InlineStyleControls from "./ToolBar/InlineStyleControls";
import BlockStyleControls from "./ToolBar/BlockStyleControls";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    ...theme.spreadThis,

  root:{
    "margin-left": "250px",
    "margin-top": "100px",
    "border": "1px solid rgb(202, 202, 202);",
    "width": "50%",
    "background-color":"white",
  
  },
 
 toolbar:{
  "border-bottom": "1px solid rgb(202, 202, 202);",
  "width": "100%",
  "padding":"10px"
  
 },
 submit:{
  "border-top": "1px solid rgb(202, 202, 202);",
  "width": "100%",
  "height": "4rem",
  "padding":"10px",
  
 },
 draft:{
  //"border": "1px solid rgb(202, 202, 202);",
  "width": "100%",
  "padding":"10px",
  "margin-right": "10px",
  "height":"25rem",
 },
 submitB:{
   float:"right",
   "margin-right":"5px"
 }
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
    const {classes} = this.props;
    const { editorState } = this.state;

    //console.log(this.state.editorState);
    return (
      <Grid  className={classes.root}>

          <Grid item className={classes.toolbar} >
          <InlineStyleControls editorState={this.state.editorState}  onToggle={this.toggleInlineStyle} />
          <BlockStyleControls editorState={this.state.editorState}  onToggle={this.toggleBlockType} />
          </Grid>
          <Grid item className={classes.draft} >
          <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Post a content..."
            ref="editor"
            spellCheck={true}
          />
        </Grid>
        <Grid item className={classes.submit} >
        <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitB}
              >
                Submit
              </Button> 
              <Button
                type="button"
                variant="contained"
                color="light"
                className={classes.submitB}
              >
                Clear
              </Button>  
              </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(MyEditor);
