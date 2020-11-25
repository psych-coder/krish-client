import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  SET_INFORMATIONS,
  POST_INFO,
  SET_IMAGE,
  SET_TAGS,
  IMAGE_LOADING,
  STOP_IMAGE_LOADING,
  DELETE_INFO,
  SET_POST,
} from "../types";

import axios from "axios";

//Get All Screams
export const getScreams = () => dispatch => {
 
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screams")
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      });
    });
};


//get a Scream

export const getScream = (screamId) => dispatch =>{
  dispatch({type:LOADING_UI})
  axios.get(`/scream/${screamId}`)
  .then(res => {
    dispatch({
      type : SET_SCREAM,
      payload: res.data
    })
    dispatch({type: STOP_LOADING_UI});
  })
  .catch(err => console.log(err));
}
//Like a Scream
export const likeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
//Unlike a scream
export const unlikeScream = screamId => dispatch => {

  axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};


//submit a comment

export const submitComment = (screamId, commentData) => dispatch =>{
  axios
    .post(`/scream/${screamId}/comment`,commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      })
      dispatch(clearErrors())
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload : err.response.data
      })
    });
}
//Delete Scream
export const deleteScream = screamId => dispatch => {
  axios
    .delete(`/scream/${screamId}`)
    .then(res => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  
  dispatch({type : LOADING_DATA })
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_INFORMATIONS,
        payload: res.data.informations
      });
    })
    .catch(() => {
      dispatch({
        type: SET_INFORMATIONS,
        payload: null
      });
    });
}

export const clearErrors = () => dispatch =>{
  dispatch({
    type : CLEAR_ERRORS
  })
}

//Get information
export const getInformation = (tagName) => dispatch => {

  let  path= "/informations"
  if(tagName !==undefined && tagName !== "" && tagName !== "All"){
    path = `/informations/tags/${tagName}`
  }
  dispatch({ type: LOADING_DATA });
  axios
    .get(path)
    .then(res => {
      dispatch({
        type: SET_INFORMATIONS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_INFORMATIONS,
        payload: []
      });
    });
};


export const getPost = (id) => dispatch => {

  //debugger;
  //let path = `/informations/${id}`
  axios.get(`/information/${id}`)
  .then(res => {
    dispatch({
      type : SET_POST,
      payload: res.data
    })
   // dispatch({type: STOP_LOADING_UI});
  })
  .catch(err => console.log(err));
};



//Post a scream

export const postScream = (newScream) => (dispatch) =>{
  dispatch({type : LOADING_UI});
  axios.post("/scream", newScream)
  .then(res =>{
    dispatch({
      type : POST_SCREAM,
      payload : res.data
    });
    dispatch(clearErrors())
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload : err.response.data
    })
  })
}

export const postInfo = (newInfo) => (dispatch) =>{
  //debugger;
  dispatch({type : LOADING_UI});
  axios.post("/information", newInfo)
  .then(res =>{
    dispatch({
      type : POST_INFO,
      payload : res.data
    });
    //dispatch({type: STOP_IMAGE_LOADING});
    dispatch(clearErrors())    
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload : err.response.data
    })
  })
}

export const updateInfo = (id,newInfo) => (dispatch) =>{
  //debugger;
  dispatch({type : LOADING_UI});
  axios.put(`/information/${id}`,newInfo)
  .then(res =>{
    dispatch({
      type : POST_INFO,
      payload : res.data
    });
    //dispatch({type: STOP_IMAGE_LOADING});
    dispatch(clearErrors())    
  })
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload : err.response
    })
  })
}
export const uploadImage = (formData,mode) => (dispatch) => {
  //debugger;
  dispatch({
    type : IMAGE_LOADING,
    payload:mode
  });
  axios.post('/information/image',formData)
  .then(res => {
    console.log(res.data);
    dispatch({
      type : SET_IMAGE,
      payload : res.data
    }); 
    //dispatch({type: STOP_IMAGE_LOADING});
  })
  .catch(err => console.log(err))
}

export const getTags = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/tags")
    .then(res => {
      dispatch({
        type: SET_TAGS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_TAGS,
        payload: []
      });
    });
};

//Delete Scream
export const deletePost = id => dispatch => {
  axios
    .delete(`/information/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_INFO,
        payload: id
      });
    })
    .catch(err => {
      console.log(err);
    });
};