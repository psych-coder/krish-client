import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostInfo from '../Info/PostInfo'
//Redux 
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';

import withStyles from "@material-ui/core/styles/withStyles";


const styles = (theme) => ({
    navbar: {
        "background-color": "white",
    },
    facebook:{
       
        "background-color": "#1298f6"
    },

    youtube:{
        "background-color": "#ff0000",
     
    }
  });

class Navbar extends Component {
    
    render() {
        const { classes } = this.props;
        const { authenticated } = this.props;
        return (
            <AppBar className={classes.navbar} >
               <Toolbar className='nav-container'> 
                    {authenticated ? (
                    <Fragment>
                       <PostInfo />
                        <Link to="/">
                            <MyButton tip="Home" >
                                <HomeIcon />
                            </MyButton>
                        </Link>
                        {/* <MyButton tip="Notifications" >
                            <Notifications />
                        </MyButton> */}
                    </Fragment>
                    ) : (
                    <Fragment>
                      
                        <Link to="/">
                            <MyButton tip="Home" >
                                <HomeIcon color="primary" />
                            </MyButton>
                        </Link>

                        <Link to="/">
                            <MyButton tip="Home" >
                                <FacebookIcon color="primary" />
                            </MyButton>
                        </Link>

                        <Link to="/">
                            <MyButton tip="Home" >
                                <YouTubeIcon color="secondary" />
                            </MyButton>
                        </Link>
                    </Fragment>        
                )}
                </Toolbar>
            </AppBar>                
        )}
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
  });
    
  Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
  };

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
