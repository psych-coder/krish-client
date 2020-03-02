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
  SET_NEWSFEED,
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
  console.log( "likeScream " +  screamId );
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
  console.log( "unLikeScream " +  screamId );

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
        type: SET_SCREAMS,
        payload: res.data.screams
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
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
export const getInformation = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/informations")
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

export const getNewsFeed = () => dispatch =>{
  dispatch({ type: LOADING_DATA });


  
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
  let Parser = require('rss-parser');
      let parser = new Parser();
      let newsFeed=[];
      (async () => {
      
        
      let feed = await parser.parseURL(CORS_PROXY  + 'http://zeenews.india.com/tamil/india.xml');
      console.log(" feed =  " + feed.title);
      
      feed.items.forEach(item => {
         // console.log(item.title + ':' + item.link)
          newsFeed.push({
            "title": item.title,
            "link": item.link
          }) 
          
      });
      
      })();
      console.log(newsFeed.length);
      dispatch({
        type: SET_NEWSFEED,
        payload: "Gokul"
      });


}