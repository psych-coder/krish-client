import React, { Component } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ActionMenu from "../Menu/ActionMenu";

const styles = theme => ({
  root: {
    //maxWidth: 700,
    margin: "auto",
    "margin-bottom" : "30px",
    "box-shadow":"none",
    "border": "1px solid rgb(202, 202, 202);"
  },
 
  media: {
   // height: '100%',
    margin: "auto",
    width:'100%',
    //margin:"10%",
    //padding: "30%"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    //color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: blue[500]
  }
});

class Info extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      setExpanded: ""
    };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    dayjs.extend(relativeTime);
    const { classes } = this.props;
    const { authenticated } = this.props.user;
    console.log(authenticated);
    const {
      information: {
        informationId,
        title,
        body,
        createdAt,
        cardImage,
        shortDesc
      }
    } = this.props;

    const trimedBody = shortDesc.length > 100 ? shortDesc.substring(0, 100) + "..." : body;
    const imageAvaliable = cardImage !== undefined && cardImage.trim() !== "" ? (

       <CardMedia
       component="img"
       height="300"
          className={classes.media}
          image={cardImage}
        />
      ) : null;

      const renderHTML = require('react-render-html');

    return (
      
      <Card className={classes.root} variant="outlined">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              U
            </Avatar>
          }
          action={
            <ActionMenu showMenu={authenticated} informationId={informationId} />
          }
          title={title}
          subheader={dayjs(createdAt).fromNow()}
        />
       
        {imageAvaliable}
        <Collapse in={!this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent in={this.state.expanded.toString()}>
            <Typography paragraph color="textPrimary" component="p">
           { renderHTML( trimedBody)}
              
            </Typography>
          </CardContent>
        </Collapse>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{body}</Typography>
          </CardContent>
        </Collapse>
        
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {shortDesc.length > 300 && (<IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="show more"
          >
            
          </IconButton>) }
          
        </CardActions>
      </Card>
    );
  }
}

Info.propTypes = {
  information: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Info));
