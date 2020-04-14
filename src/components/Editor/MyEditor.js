import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

import FormatBold from '@material-ui/icons/FormatBold';
import MyButton from "../../util/MyButton";
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
  buttonC:{
     "border-radius": "10%"
  },
  "mybutton:hover":{
    "background-color":"white"
  }
});
class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }
  render() {
    const {classes} = this.props;

    console.log(this.state.editorState);
    return (
      <div>
        <MyButton id="mybutton" btnClassName={classes.buttonC} tip="Home" onClick={this._onBoldClick.bind(this)} size="small" color="textPrimary" >
          <FormatBold />
        </MyButton>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
export default withStyles(styles)(MyEditor);
