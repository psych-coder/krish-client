import React, { Component } from "react";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";


import cloudyWithRain from "../../images/weathericons/cloudy2.png";
import cloudy from "../../images/weathericons/cloudy.png";
import rain from "../../images/weathericons/rain.png";
import sunny from "../../images/weathericons/sunny.png";
import scatterclouds from "../../images/weathericons/scatterclouds.png";




const styles = (theme) => ({
  root: {
    maxWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  fullLine: {
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: "100%",
    marginBottom: 10,
  },
  halfLine: {
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: "50%",
    marginBottom: 10,
  },
  ml10px: {
    "margin-left": "10px",
  },
  floatL: {
    float: "left",
  },
  icon: {
    "background-color": "transparent",
    "width": "40px",
    height: "40px",
    display: "flex",
    overflow: "hidden",
    position: "relative",
    //"font-size": "1.25rem",
    "align-items": "center",
    "flex-shrink": 0,
    //"font-family": "Roboto", "Helvetica", "Arial", sans-serif;
    "line-height": 1,
    "user-select": "none",
    "border-radius": "50%",
    float: "left",
    //"justify-content": "center",
    "margin-right": "10px",
  }
});


class Weather extends Component {

  state = {
    maintemp: "",
    desc: "",
    city: "",
  }


  componentDidMount = () => {
    const weatherURL =
      `http://api.openweathermap.org/data/2.5/weather?q=Tokoyo&units=metric&APPID=`

    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          maintemp: data.main.temp,
          desc: this.capitalizeFirstLetter(data.weather[0].main),
          city: data.name,
        })
      })

  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getTimeForCity = (cityname) => {
    var now = new Date();
      var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      return new Date((utc.getTime())+19800*1000)
  }
  render() {

    const { classes } = this.props;

    const bull = <span className={classes.bullet}>•</span>;

    let iconImage=sunny;

    if(this.state.desc === "Sunny")
      iconImage=sunny
    else if(this.state.desc == "Scattered clouds" || this.state.desc === "Few clouds" || this.state.desc === "Clouds" )
      iconImage=scatterclouds
    else if(this.state.desc == "Cloudy" || this.state.desc == "Mist"  )
      iconImage=cloudy
 
  
    let weatherMarkup = !this.state.city ? (
      <CardContent>
        <Typography variant="body2" component="p" className={classes.fullLine} gutterbottom > </Typography>
        <Typography variant="body2" component="p" className={classes.halfLine} gutterbottom > </Typography>
        <Typography variant="body2" component="p" className={classes.halfLine} gutterbottom > </Typography>
      </CardContent>

    ) : (
      <Card>
        <CardContent>
          <form className={classes.root} noValidate autoComplete="off" gutterbottom >
            <TextField id="standard-basic" label={this.state.city} />
          </form>
          <br />

          <div >
            <img className={classes.icon} src={iconImage} />
          </div>

          <Typography>
            {this.state.maintemp}<span>&#8451;</span>
          </Typography>

          <Typography variant="body2" component="p" gutterbottom>
            {this.state.desc}
          </Typography>

        </CardContent>
        <CardActionArea>
          <Typography variant="body6" component="p" gutterbottom className={classes.ml10px}>
            Icons made by <a href="https://www.freepik.com" rel="noopener noreferrer" target="_blank" title="Freepik">Freepik</a> from <a rel="noopener noreferrer" target="_blank" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          </Typography>
        </CardActionArea>
      </Card>
    )
    return (
      <div>
        <Card className={classes.root}>
          {weatherMarkup}
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Weather);