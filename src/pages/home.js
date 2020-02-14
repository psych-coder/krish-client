import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';

import Info from '../components/Info/Info';
import InfoSkeleton from '../util/InfoSkeleton'
import { connect } from 'react-redux';
import { getInformation } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getInformation();
  }
  render() {
    const { informations, loading } = this.props.data;
    console.log(informations);
    let recentScreamsMarkup = !loading ? (
      informations.map((information) => <Info key={information.informationId} information={information} />)
    ) : (
      <InfoSkeleton/>
    );
    return (
      <Fragment> {recentScreamsMarkup} </Fragment>
        
    );
  }
}

home.propTypes = {
  getInformation: PropTypes.func.isRequired,
  data: PropTypes.object
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getInformation }
)(home);