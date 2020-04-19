import React, { Fragment } from "react";
import RenderInlineStyle from './inlineStyle';


class ToolBar extends React.Component {
     
  render() {
   const { editorState,updateEditorState} = this.props;
    return (
      <Fragment>
        <RenderInlineStyle editorState={editorState} updateEditorState={updateEditorState} />
      </Fragment>
    );
  }
}
export default ToolBar;
