import React, { Component } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import axios from "axios";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";

import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ActionMenu from "../Menu/ActionMenu";
import MediaView from "./MediaView";
import InfoDialog from "./InfoDialog";


import { getPost } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  root: {
    //maxWidth: 700,
    margin: "auto",
    "margin-bottom": "30px",
    "box-shadow": "none",
    border: "1px solid rgb(202, 202, 202);",
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },

});

class Info extends Component {
  constructor(props) {
    super();
    this.state = {
      dialogopen: false,
      expanded: false,
      setExpanded: "",
      //open: false,
      informationId :"",
      title:"",
      body:"",
      createdAt:"",
      cardImage:"",
      shortDesc:"",
      youtubid: ""
    };

    this.handleDialogClose = () => this._handleDialogClose();
    //this.handleClose = () => this._handleClose();
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.infoid);
  }
  
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleDialogClick = () => {
    this.setState({ dialogopen: true });
  };

  _handleDialogClose = (dispatch) => {
    this.setState({ dialogopen: false });
  };
  /* _handleClose = (dispatch) => {
    this.setState({ open: false });
  }; */

  componentDidMount() {
    if(this.props.match) {
    const infoid = this.props.match.params.infoid;
    //const screamId = this.props.match.params.screamId;

    if(infoid) this.setState({informationId: infoid});
    
    axios
    .get(`/information/${infoid}`)
    .then((res) => {
     this.setState({
      informationId : res.data.informationId,
      title: res.data.title,
      body:res.data.body,
      createdAt:res.data.createdAt,
      cardImage:res.data.cardImage,
      shortDesc:res.data.shortDesc,
      youtubid: res.data.youtubid
     })
    })
    .catch((err) => console.log(err));
  }
  }

  render() {
    dayjs.extend(relativeTime);
    const { classes } = this.props;
    const { authenticated } = this.props.user;
    var informationId="",title="",body="",createdAt="",cardImage="",shortDesc="",youtubid = "", open=false;

    if(this.props.information){
   		informationId = this.props.information.informationId;
			title = this.props.information.title;
			body = this.props.information.body;
			createdAt = this.props.information.createdAt;
			cardImage = this.props.information.cardImage;
			shortDesc =this.props.information.shortDesc;
			youtubid =this.props.information.youtubid;
      open=true;
	  }else{
      informationId = this.state.informationId;
			title = this.state.title;
			body = this.state.body;
			createdAt = this.state.createdAt;
			cardImage = this.state.cardImage;
			shortDesc =this.state.shortDesc;
			youtubid =this.state.youtubid;
      open=false;
    }
    
    //const trimedBody =
    //shortDesc.length > 100 ? shortDesc.substring(0, 100) + "..." : body;
    /*  const imageAvaliable =
       cardImage !== undefined && cardImage.trim() !== "" ? (
         <CardActionArea onClick={this.handleMediaClick}>
           <CardMedia component="img" height="300" image={cardImage} />
         </CardActionArea>
       ) : null; */

    const renderHTML = require("react-render-html");
    const bodyMarkup = renderHTML(body);

    const dialog = {
      authenticated: authenticated,
      title:title,
      createdAt: dayjs(createdAt).fromNow(),
      bodyMarkup: bodyMarkup,
      youtubid: youtubid,
      cardImage:cardImage,
      informationId:informationId      
    }


    return (
      <Card className={classes.root} variant="outlined">
      
       <InfoDialog
          dialog={dialog}
          open = {open}
        />

<MediaView cardImage={cardImage} youtubid={youtubid} />
<Collapse in={!this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent in={this.state.expanded.toString()}>
            <Typography paragraph color="textPrimary" component="p">
              {shortDesc}
            </Typography>
          </CardContent>
        </Collapse>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent >
            <Typography paragraph>{bodyMarkup}</Typography>
          </CardContent>
        </Collapse>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {shortDesc.length > 100 && (
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />

            </IconButton>
          )}
        </CardActions>

      </Card>
    );
  }
}

Info.propTypes = {
  information: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  
};



const mapStateToProps = (state) => ({
  user: state.user,
  //data: state.data,
  //information : state.data.information
});

export default connect(mapStateToProps)(withStyles(styles)(Info));
