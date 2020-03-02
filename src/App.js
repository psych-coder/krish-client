import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import Navbar from "./components/layout/Navbar";
import home from "./pages/home";
import info from "./components/Info/Info";
import signup from "./pages/signup";
import user from './pages/user';
import NewsFeed from './pages/newsfeed';
import themeFile from "./util/theme";

import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser,getUserData} from './redux/actions/userAction';
import axios from "axios";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = "https://asia-east2-manithakurangu-338c3.cloudfunctions.net/api"

const token = localStorage.FBIdToken;
console.log(token);
if (token) {
  const decodeToken = jwtDecode(token);
  console.log(decodeToken);
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
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
        
            <Router>
              <Navbar />
              <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute
                  exact
                  path="/gk"
                  component={home}
                />
                <AuthRoute
                  exact
                  path="/newsfeed"
                  component={NewsFeed}
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
