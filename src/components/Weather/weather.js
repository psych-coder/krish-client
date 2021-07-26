import React, { Component } from "react";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";


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
  ml10px:{
    "margin-left":"10px",
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
      `http://api.openweathermap.org/data/2.5/weather?q=Chennai&units=metric&APPID=`

    fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          maintemp: data.main.temp,
          desc: data.weather[0].description,
          city: data.name,
        })
      })

  }


  render() {

    const { classes } = this.props;

    const bull = <span className={classes.bullet}>•</span>;

    let weatherMarkup = !this.state.city ? (
      <CardContent>
        <Typography variant="body2" component="p" className={classes.fullLine} gutterBottom > </Typography>
        <Typography variant="body2" component="p" className={classes.halfLine} gutterBottom > </Typography>
        <Typography variant="body2" component="p" className={classes.halfLine} gutterBottom > </Typography>
      </CardContent>

    ) : (
      <Card>
        <CardContent>

          <form className={classes.root} noValidate autoComplete="off" gutterBottom >
            <TextField id="standard-basic" label={this.state.city} />
          </form>
          <br />

          <Typography gutterBottom variant="body2" component="p" >
            {this.state.maintemp}<span>&#8451;</span>
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            {this.state.desc}
          </Typography>

        </CardContent>
        <CardActionArea>
          <Typography variant="body2" component="p" gutterBottom className={classes.ml10px}>
            Icons made by <a href="https://www.freepik.com" rel="noopener noreferrer" target="_blank" title="Freepik">Freepik</a> from <a rel="noopener noreferrer" target="_blank"  href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
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