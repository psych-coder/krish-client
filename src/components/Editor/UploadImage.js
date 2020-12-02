import React, { Fragment } from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import MyButton from "../../util/MyButton";
import EditIcon from "@material-ui/icons/Edit";

import { uploadImage } from "../../redux/actions/dataActions";
import { connect } from "react-redux";
import store from "../../redux/store";



const styles = (theme) => ({
  ...theme.spreadThis,
  submit: {
    "border-top": "1px solid rgb(202, 202, 202);",
    width: "100%",
    height: "3rem",
    //padding: "10px",
  },
  submitB: {
    float: "right",
    "margin-right": "5px",
    "margin-top": "10px",
  },
});

class UploadImage extends React.Component {
  handleImageChange = (event) => {
    //debugger;
    const image = event.target.files[0];
   
  
     if (image) {
      const formData = new FormData();
      this.setState({ filename: image.name });
      formData.append("image", image, image.name);
      store.dispatch(uploadImage(formData, this.props.mode));
    } 
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  render() {
    //const { classes } = this.props;
    const { imageURl } = this.props;

    return (
      <Fragment>
     
       
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
      
      </Fragment>
    );
  }
}

UploadImage.propTypes = {
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user
  //data: state.data,
});


const mapsActionsToProps = {
  uploadImage,
};
export default connect(
  mapStateToProps,
  mapsActionsToProps
)(withStyles(styles)(UploadImage));
