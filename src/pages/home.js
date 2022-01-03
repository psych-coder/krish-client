import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Info from "../components/Info/Info";
import Tags from "../components/tags/tags";
import InfoSkeleton from "../util/InfoSkeleton";
import { connect } from "react-redux";
import { getInformation } from "../redux/actions/dataActions";
//import Profile from "../components/profile/Profile";
import withStyles from "@material-ui/core/styles/withStyles";
import AdSense from "../components/AdSense/AdSense";
//import Weather from "../components/Weather/weather";
import InfiniteScroll from "react-infinite-scroll-component";

import {
 
  LOADING_DATA,
} from "../redux/types";

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
      tagName:"",
      informations: Array.from({ length: 5 }),
      saa: Array.from({ length: 5 }),
      loading:true,

    }
  }
  componentDidMount() {
    const tagName = this.props.match.params.tagname;
    this.setState({tagName:tagName});
    let path = "/informations/1";
   
    
    axios
      .get(path)
      .then((res) => {
        
        this.setState({informations: res.data,loading:false});
      })
      .catch((err) => console.log(err));
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    //setTimeout(this.props.getInformation("D2CNoVfI5aBzdYpv4kuW",true), 1500);
    let infoid = this.state.informations[this.state.informations.length-1].informationId;
    let path = `/informations/${infoid}`

   // console.log("*********************")
    console.log(this.state.informations[this.state.informations.length-1].informationId);

    setTimeout(() => {
      axios
      .get(path)
      .then((res) => {
        
        this.setState({informations: this.state.informations.concat(res.data),loading:false});
      })
      .catch((err) => console.log(err));
    }, 1500); 

    
  }
  
  render() {
    const { classes } = this.props;

    //const { loading } = this.props.data;
    //const { authenticated } = this.props.user;

    //let location = this.props.location.pathname;
   
    console.log("DDDDDDDDDDDDDDDDDDDDDDDD ")
    console.log(this.state.informations);


    let recentScreamsMarkup;
    
   

  recentScreamsMarkup = !this.state.loading ? (
      <InfiniteScroll
      dataLength={this.state.informations.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          { this.state.informations.map((information, index) => (
               <Info key={information.informationId} information={information} />

      ))}
        </InfiniteScroll>
     
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
