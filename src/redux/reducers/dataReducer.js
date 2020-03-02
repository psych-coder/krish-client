import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  SET_INFORMATIONS,
  SET_NEWSFEED
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
  informations: [],
  information: {},
  newsFeed : []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_NEWSFEED:
      return {
        ...state,
        newsFeed: action.payload,
        loading: false
      };
    case SET_INFORMATIONS:
      return {
        ...state,
        informations: action.payload,
        loading: false
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
           };
    case POST_SCREAM:
      return {
        ...state,
        screams: [
          action.payload,
          ...state.screams
        ]
      }
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if(state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload
      }
      return {
        ...state
      };
    }
    case SUBMIT_COMMENT:
      return{
        ...state,
        scream:{
          ...state.scream,
          comments :[action.payload, ...state.scream.comments]
        }

      }
    case DELETE_SCREAM:
        let index = state.screams.findIndex(scream =>
            scream.screamId === action.payload
         );
         state.screams.splice(index,1);
         return{
             ...state 
         }
    default:
      return state;
  }
}