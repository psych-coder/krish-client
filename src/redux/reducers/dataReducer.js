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
  POST_INFO,
  SET_IMAGE,
  SET_TAGS,
  DELETE_INFO,
  SET_POST,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
  informations: [],
  information: {},
  newsFeed: [],
  cardImage: "",
  tags: [],
  imagedetails: {imageURl:""},
};

export default function (state = initialState, action) {
  //debugger;
  switch (action.type) {
    case SET_TAGS:
      return {
        ...state,
        tags: action.payload,
      };
    case SET_INFORMATIONS:
      return {
        ...state,
        informations: action.payload,
        loading: false,
      };
    case SET_POST:
      return {
        ...state,
        information: action.payload,
      };
    case DELETE_INFO:
      let index = state.informations.findIndex(
        (information) => information.informationId === action.payload
      );
      state.informations.splice(index, 1);
      return {
        ...state,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_IMAGE:
      // debugger;
      return {
        ...state,
        imagedetails: action.payload,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case POST_SCREAM:
      //debugger;
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case POST_INFO:
      //debugger;
      return {
        ...state,
        informations: [action.payload, ...state.informations],
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };
    }
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state,
      };
     
    default:
      return state;
  }
}
