import React, { Fragment } from "react";
import { Editor, EditorState, RichUtils, ContentState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import axios from "axios";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import CircularProgress from "@material-ui/core/CircularProgress";
import InlineStyleControls from "./ToolBar/InlineStyleControls";
import BlockStyleControls from "./ToolBar/BlockStyleControls";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { convertToHTML } from "draft-convert";
import { convertToRaw } from "draft-js";
import getInfo from "../../util/getInfo";

import { connect } from "react-redux";

import UploadImage from "./UploadImage";
import { postInfo, getPost, updateInfo } from "../../redux/actions/dataActions";
import ImgCard from "./imgcard";

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

    console.log(this.state);
    this.state = {
      editorState: EditorState.createEmpty(),
      editorpick: false,
      mode: "create",
      infoid : "",
      imageloading:false,
      imageURl:""
    };

    /* if (!this.props.information || this.props.UI.mode === "create") {
      this.state = { editorState: EditorState.createEmpty(), editorpick: false, };
    } else {
      //this.state = { mode: "update" };

      const contentState = stateFromHTML(this.props.information.body);

      this.state = {
        editorState: EditorState.createWithContent(contentState),
      };
    } */

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };

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
    //debugger;
    //console.log(this.state.editorState);
    //this.props.handleSubmit(event, this.state.editorState);

    //event.preventDefault();

    let rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    let htmlContent = convertToHTML(this.state.editorState.getCurrentContent());


    let cardImage = (!this.props.data.imagedetails || this.props.data.imagedetails.imageURl ==="") ? (this.state.imageURl) : (this.props.data.imagedetails.imageURl)

    let information = {
      title: getInfo.getTitle(rawContent),
      body: htmlContent,
      cardImage: cardImage,
      shortDesc: getInfo.getShortDesc(rawContent),
      editorpick: this.state.editorpick,
      imageName: this.props.data.imagedetails.filename,
    };
    
    if(this.state.mode ==="update"){
      this.props.updateInfo(this.state.infoid,information);
    }
    else{
      this.props.postInfo(information);
    }
    //window.history.pushState(null, null, "/");
    this.props.history.push("/");
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

  componentDidMount() {
    const infoid = this.props.match.params.infoid;

    //if(screamId) this.setState({screamIdParam: screamId});
    /* this.props.getPost(infoid);
    const contentState = stateFromHTML(this.props.information);

    this.setState( {
        mode: "update",
      }) */
    axios
      .get(`/information/${infoid}`)
      .then((res) => {
        const contentState = stateFromHTML(res.data.body);

        this.setState({
          editorState: EditorState.createWithContent(contentState),
          mode:"update",
          infoid: infoid,
          
        });

        if(res.data.cardImage){
          this.setState({imageURl : res.data.cardImage,
          imageloading:true});
        }
      })
      .catch((err) => console.log(err));
  }

  componentWillUnmount(){
    this.setState({imageURl:""})
  }

  render() {
    const { classes } = this.props;
    const { editorState, name, mode = "create" } = this.state;
    //const { filename } = this.props.data;
    //const { imageURl } = this.props.data.imagedetails;
    //console.log(this.props.data.mode);

    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    //console.log(cardImage);
    let imageURl = this.props.UI.imageloading===true ? (this.props.data.imagedetails.imageURl) : (this.state.imageURl)
    return (
      <Fragment>
        <Typography variant="h6">Post your content</Typography>

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
        </div>

        <div className={classes.submit}>
          <UploadImage mode={this.props.mode} />

          {(this.props.UI.imageloading || this.state.imageloading) && (
            <ImgCard
              image={imageURl}
              filename=""
             
            />
          )}

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
      </Fragment>
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
  postInfo: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});
const mapsActionsToProps = {
  postInfo,
  getPost,
  updateInfo,
};
export default connect(
  mapStateToProps,
  mapsActionsToProps
)(withStyles(styles)(MyEditor));
