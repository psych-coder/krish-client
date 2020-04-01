import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import Info from "../components/Info/Info";
import InfoSkeleton from "../util/InfoSkeleton";
import { connect } from "react-redux";
import { getInformation } from "../redux/actions/dataActions";
import Profile from "../components/profile/Profile";

class home extends Component {
  componentDidMount() {
    this.props.getInformation();
  }
  render() {
    const { informations, loading } = this.props.data;
    //const { authenticated } = this.props.user;
    
    const location = this.props.location.pathname;

    console.log(informations);

    let recentScreamsMarkup = !loading ? (
      informations.map(information => (
        <Info key={information.informationId} information={information} />
      ))
    ) : (
      <InfoSkeleton />
    );
    let profileMarup =
      location === "/kurangu" ? (
        <Grid item sm={3} xs={12}>
          <Profile />
        </Grid>
      ) : null;
    return (
      <Grid container spacing={1}>
        <Grid item sm={8} xs={1}>
          {recentScreamsMarkup}
        </Grid>
        {profileMarup}
      </Grid>
    );
  }
}

home.propTypes = {
  getInformation: PropTypes.func.isRequired,
  data: PropTypes.object
};

const mapStateToProps = state => ({
  data: state.data,
  user : state.user
});

export default connect(mapStateToProps, { getInformation })(home);
