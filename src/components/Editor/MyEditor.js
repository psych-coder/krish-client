import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

import FormatBold from '@material-ui/icons/FormatBold';
import MyButton from "../../util/MyButton";
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from "@material-ui/core/Grid";
import ToolBar from "./ToolBar/index";

const styles = theme => ({
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
 draft:{
  //"border": "1px solid rgb(202, 202, 202);",
  "width": "100%",
  "padding":"10px",
  "height":"25rem",
 }
});
class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), isActive:false };
    //this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.updateEditorState = this.updateEditorState.bind(this);
  }
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.updateEditorState(newState);
      return "handled";
    }
    return "not-handled";
  }
 
  updateEditorState(editorState,style){
   
    this.setState({ editorState })
    const currentStyle = editorState.getCurrentInlineStyle();
    this.setState({isActive:currentStyle.has(style)})
  }

 
  render() {
    const {classes} = this.props;

    //console.log(this.state.editorState);
    return (
      <Grid  className={classes.root}>

          <Grid item className={classes.toolbar} >
          <ToolBar editorState={this.state.editorState} updateEditorState={this.updateEditorState.bind(this)} />
          </Grid>
          <Grid item className={classes.draft} >
          <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.updateEditorState.bind(this)}
          
        />
          </Grid>
          
        
      </Grid>
    );
  }
}
export default withStyles(styles)(MyEditor);
