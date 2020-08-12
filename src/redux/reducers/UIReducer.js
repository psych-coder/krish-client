import {
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  IMAGE_LOADING,
  STOP_IMAGE_LOADING
} from "../types";

const intialState = {
  loading: false,
  errors: null,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        imageloading:false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
        //open: true,
        errors: action.payload,
      };
    case IMAGE_LOADING:
      return {
        ...state,
        imageloading: true,
        //open: true,
        errors: action.payload,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
        // open: false,
      };
    case STOP_IMAGE_LOADING:
      return {
        ...state,
        imageloading: false,
        //loading: false,
        // open: false,
      };
    default:
      return state;
  }
}
