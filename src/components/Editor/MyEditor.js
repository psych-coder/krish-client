import React from "react";
import { Editor, EditorState, RichUtils, ContentState } from "draft-js";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import CircularProgress from "@material-ui/core/CircularProgress";
import InlineStyleControls from "./ToolBar/InlineStyleControls";
import BlockStyleControls from "./ToolBar/BlockStyleControls";
import Button from "@material-ui/core/Button";
import MyButton from "../../util/MyButton";
import ImgCard from "./imgcard";
import EditIcon from "@material-ui/icons/Edit";

import { uploadImage } from "../../redux/actions/dataActions";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { CardContent } from "@material-ui/core";

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
    //console.log(this.state.editorState);
    this.props.handleSubmit(event, this.state.editorState,);
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
  handleImageChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      const formData = new FormData();
      this.setState({ filename: image.name });
      formData.append("image", image, image.name);
      this.props.uploadImage(formData);
    }
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  render() {
    const { classes } = this.props;
    const { editorState, name } = this.state;
    //const { filename } = this.props.data;
    const { imageURl,filename } = this.props.data.imagedetails;

    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    //console.log(cardImage);

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

        {this.props.imageloading && (
          <ImgCard image={imageURl} filename={name} loading={this.props.imageloading} />
        )}

        <div className={classes.submit}>
          <input
            type="file"
            name="file"
            id="imageInput"
            hidden="hidden"
            onChange={this.handleImageChange}
          />

          <MyButton
            tip="Upload Image"
            onClick={this.handleEditPicture}
            btnClassName="button"
          >
            <EditIcon color="primary" />
          </MyButton>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitB}
            onClick={this.handleSubmit}
          >
            Submit
            {this.props.loading && (
              <CircularProgress size={30} className={classes.progressSpinner} />
            )}
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

MyEditor.propTypes = {
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

const mapsActionsToProps = {
  uploadImage,
};
export default connect(
  mapStateToProps,
  mapsActionsToProps
)(withStyles(styles)(MyEditor));
