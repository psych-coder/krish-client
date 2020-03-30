import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream'
//Redux 
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import Notifications from './Notifications';

class Navbar extends Component {
    
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
               <Toolbar className='nav-container'> 
                    {authenticated ? (
                    <Fragment>
                       <PostScream />
                        <Link to="/">
                            <MyButton tip="Home" >
                                <HomeIcon />
                            </MyButton>
                        </Link>
                        <MyButton tip="Notifications" >
                            <Notifications />
                        </MyButton>
                    </Fragment>
                    ) : (
                    <Fragment>
                        <Button color='inherit' component={Link} to='/gk'>GK</Button>
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

export default connect(mapStateToProps)(Navbar);
