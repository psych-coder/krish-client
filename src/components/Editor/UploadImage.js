import React, { Fragment } from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import MyButton from "../../util/MyButton";
import EditIcon from "@material-ui/icons/Edit";

import { uploadImage } from "../../redux/actions/dataActions";
import { connect } from "react-redux";
import store from "../../redux/store";

import imageCompression from 'browser-image-compression';

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

  constructor(props){
    super(props)
    this.handleImageChange = this.handleImageChange.bind(this);
  }

 
  handleImageChange = (event) => {
    //debugger;
    
    const image = event.target.files[0];
    console.log('originalFile instanceof Blob', image instanceof Blob); // true
    console.log(`originalFile size ${image.size / 1024 / 1024} MB`);
    this.setState({ filename: image.name });
    var options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 480,
      useWebWorker: true
    }
    imageCompression(image, options)
      .then(function (compressedFile) {
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        const formData = new FormData();
               
                formData.append("image", compressedFile, image.name);
               store.dispatch(uploadImage(formData));
   
       // return uploadToServer(compressedFile); // write your own logic
      })
      .catch(function (error) {
        console.log(error.message);
      });
    
    /* const formData = new FormData();
                this.setState({ filename: image.name });
                formData.append("image", image, image.name);
               //store.dispatch(uploadImage(formData, this.props.mode)); */
  }
  
   
  
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
