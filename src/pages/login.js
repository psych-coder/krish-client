import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import AppIcon from '../images/logo.png';

import Typography from '@material-ui/core/Typography';
import TextFiled from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';


//Redux 
import {connect } from 'react-redux';
import {loginUser} from '../redux/actions/userAction';

const styles = theme => ({
    ...theme.spreadThis
  });

class login extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email : this.state.email,
            password:this.state.password
        }
        this.props.loginUser(userData,this.props.history);        
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors : nextProps.UI.errors });
        }
    }

    constructor(){
        super();
        this.state = {
            email : '',
            password:'',
            errors : {}
        }    
    }
    render() {
        const {classes, UI : {loading} } = this.props; 
        const { errors } = this.state;

        return (
          <Grid container spacing={1} className={classes.form}>
              <Grid item sm={2} xs={8} />
              <Grid item sm={4} xs={10} >
                <br/>
                <br/>
                  <Typography variant='h2' className={classes.pageTitle}>
                      Login 
                  </Typography>
                  <form noValidate onSubmit={this.handleSubmit} >
                    <TextFiled id="email" name="email" type="email" label="Email" 
                        className={classes.textField}
                        value = {this.state.email} onChange={this.handleChange} fullWidth
                        helperText={errors.email} 
                        error={errors.email ? true : false }
                        />
                    <TextFiled id="password" name="password" type="password" label="password" 
                        className={classes.textField}
                        value = {this.state.password} onChange={this.handleChange} fullWidth 
                        helperText={errors.password} 
                        error={errors.password ? true : false }
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customErrors}>
                                {errors.general}
                            </Typography>
                        )}
                        
                        <Button type="submit" variant="contained" 
                            color='primary' 
                            className={classes.button}
                            disabled={loading}
                            >
                            Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}
                        </Button>
                        <br/>
                        <small>Don't have an account? Sign up <Link to='/signup'>here</Link> </small>
                  </form> 
              </Grid>
              
          </Grid>
        )
    }
}

login.propTypes = {
    classes : PropTypes.object.isRequired,
    user : PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired,
    loginUser : PropTypes.func.isRequired,
}

const mapsStateToProps = (state) =>({
    user: state.user,
    UI: state.UI
})

const mapsActionToProps = {
    loginUser
}
export default connect(mapsStateToProps,mapsActionToProps)(withStyles(styles)(login));
