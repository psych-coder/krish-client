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
  mode: "create",
  imageloading:false
};

export default function (state = intialState, action) {
  //debugger;
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
   
    case STOP_LOADING_UI:
      return {
        //...state,
        loading: false,
        // open: false,
      };
      case IMAGE_LOADING:
        //debugger;
        //console.log(action.payload);
        return {
          ...state,
          imageloading: true,
          mode : action.payload
          //open: true,
          //errors: action.payload,
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
