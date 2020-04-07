import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import Info from "../components/Info/Info";
import InfoSkeleton from "../util/InfoSkeleton";
import { connect } from "react-redux";
import { getInformation } from "../redux/actions/dataActions";
import Profile from "../components/profile/Profile";
import withStyles from "@material-ui/core/styles/withStyles";
import { indigo } from "@material-ui/core/colors";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  root: {
    flexGrow: 21,
  },
  paper: {
    height: 50,
    width: 150,
  },
  ulClass: {
  
    color:indigo[500]
    
  },
  liClass: {
    "text-align": "right",
  },
});

class home extends Component {
  componentDidMount() {
    this.props.getInformation();
  }
  render() {
    const { classes } = this.props;

    const { informations, loading } = this.props.data;
    //const { authenticated } = this.props.user;

    const location = this.props.location.pathname;

    console.log(informations);

    let recentScreamsMarkup = !loading ? (
      informations.map((information) => (
        <Info key={information.informationId} information={information} />
      ))
    ) : (
      <InfoSkeleton />
    );
    let profileMarup = location === "/kurangu" ? <Profile /> : null;
    return (
      <Grid container className={classes.root}>
        <Grid item container spacing={1}>
          <Grid item sm={2}>
            <List component="nav" className={classes.ulClass} >
              <ListItem button selected={true} className={classes.liClass} >
                <ListItemText primary="Trash" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Spam" className={classes.liClass} />
              </ListItem>
            </List>
          </Grid>
          <Grid item sm={7}>
            {recentScreamsMarkup}
          </Grid>
          <Grid item sm={3}>
            {profileMarup}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getInformation: PropTypes.func.isRequired,
  data: PropTypes.object,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, { getInformation })(
  withStyles(styles)(home)
);
