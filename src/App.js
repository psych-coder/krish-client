import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./Draft.css";
import "./editor.css";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import Navbar from "./components/layout/Navbar";
import home from "./pages/home";
//import info from "./components/Info/Info";
import login from "./pages/login";
//import user from './pages/user';
//import NewsFeed from './pages/newsfeed';
import themeFile from "./util/theme";

import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser,getUserData} from './redux/actions/userAction';
import axios from "axios";
import MyEditor from "./components/Editor/MyEditor";
import TestC from "./components/test/TestC";
import RichEditorExample from "./components/RichEditor/RichEditor";
import Parent from "./components/test/parent";
import imgcard from "./components/test/imgcard";
import MediaPreview from "./components/Info/MediaPreview";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = "https://asia-east2-manithakurangu-338c3.cloudfunctions.net/api"
//axios.defaults.baseURL = "http://localhost:5001/manithakurangu-338c3/asia-east2/api"

const token = localStorage.FBIdToken;
//console.log(token);
if (token) {
  const decodeToken = jwtDecode(token);
  if (decodeToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({type : SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    //console.log(this.props.location)
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        
            <Router>
              <Navbar />
              <div className="container">
              <Switch>
                
              <Route exact path="/" component={home} />
                <Route exact path="/info/:tagname" component={home} />
                <Route exact path="/Editor" component={MyEditor} />
                
                <Route exact path="/test" component={RichEditorExample} />
                <Route exact path="/divtest" component={imgcard} />
                <Route exact path="/parent" component={Parent} />
                <Route exact path="/Media" component={MediaPreview} />
                <Route exact path="/Editor/:infoid" component={MyEditor} />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                />

               {/*  <AuthRoute
                  exact
                  path="/gk"
                  component={home}
                /> */}
                <AuthRoute
                  exact
                  path="/kurangu"
                  component={home}
                />
               

              </Switch>
              </div>
            </Router>
       
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;

//2196f3 2196f3
