import React, { Component, Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { withStyles } from "@material-ui/core";

import DeleteInfo from "../Info/DeleteInfo"
import PostInfo from '../Info/PostInfo'

const ITEM_HEIGHT = 48;
const options = ["Update", "Delete"];

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
};
class ActionMenu extends Component {
  state = {
    anchorEl: null,
    actionState: "",
  };
  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = (event, option) => {
    //console.log(option.option);
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const anchorEl = this.state.anchorEl;
    let showActionIcon = this.props.showMenu ? (
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={this.handleOpen}
      >
        <MoreVertIcon />
      </IconButton>
    ) : null;

    const id = this.props.informationId;

    //console.log(this.props.information);

    return (
      <Fragment>
        {showActionIcon}

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}

        >
          <MenuItem>
            {/*  <EditInfo infoId={id} /> */}
            <PostInfo infoId={id} information={this.props.information} />
          </MenuItem>
          <MenuItem>
            <DeleteInfo infoId={id} />
          </MenuItem>
          {/*   {options.map((option) => (
            <MenuItem
              key={option}
              
              //onClick={this.handleClose}
              onClick={event => this.handleClose(event, {option})}

            >
              {option}
            </MenuItem>
          ))} */}
        </Menu>
      </Fragment>
    );
  }
}
export default withStyles(styles)(ActionMenu);
