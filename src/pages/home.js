import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import Info from "../components/Info/Info";
import Tags from "../components/tags/tags";
import InfoSkeleton from "../util/InfoSkeleton";
import { connect } from "react-redux";
import { getInformation } from "../redux/actions/dataActions";
import Profile from "../components/profile/Profile";
import withStyles from "@material-ui/core/styles/withStyles";
import AdSense from "../components/AdSense/AdSense";
//import Weather from "../components/Weather/weather";

const styles = (theme) => ({
  root: {
    flexGrow: 21,
  },
  //Main Side Bar
  msb:{
    width: "200px",
    overflow: "auto",
    
  },
  //content
  mainC:{
    "margin-right":" 5%",
  },

});

class home extends Component {
  constructor(){
    super()
    this.state = {
      tagName:""
    }
  }
  componentDidMount() {
    const tagName = this.props.match.params.tagname;
    this.setState({tagName:tagName});
    this.props.getInformation(tagName);
  }
  render() {
    const { classes } = this.props;

    const { informations, loading } = this.props.data;
    //const { authenticated } = this.props.user;

    let location = this.props.location.pathname;
     
     let recentScreamsMarkup = !loading ? (
      informations.map((information) => (
        <Info key={information.informationId} information={information} />
      ))
    ) : (
      <InfoSkeleton />
    );
    //let profileMarup = location === "/kurangu" ? <Profile /> : null;
    return (
     
        <Grid item container spacing={1} >
          <Grid item sm={2} className={classes.msb }>
           <Tags />
          </Grid>
          <Grid item sm={8}>
            {recentScreamsMarkup}
          </Grid>
          <Grid item sm={3}>
            {/* {profileMarup} */}
           {/*  <Weather/> */}
           <AdSense />
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
