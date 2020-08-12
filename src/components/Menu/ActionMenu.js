import React, { Component, Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class ActionMenu extends Component {
  render() {
    console.log(this.props.showMenu);
    const { showMenu } = this.props.showMenu;

    let showActionIcon = showMenu ? (
      <IconButton aria-label="settings">
        <MoreVertIcon />
      </IconButton>
    ) : null;

    return <Fragment>{showActionIcon}</Fragment>;
  }
}
export default ActionMenu;
