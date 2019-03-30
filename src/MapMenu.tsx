// import { IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import * as React from 'react';

const timeoutLength = 300;

export class MapMenu extends React.Component {

  public state = {
    anchorEl: null,
    // Keep track of whether the mouse is over the button or menu
    mouseOverButton: false,
    mouseOverMenu: false,
  };

  constructor(props: {}) {
    super(props)
    this.state =  {
      anchorEl: null,
      // Keep track of whether the mouse is over the button or menu
      mouseOverButton: false,
      mouseOverMenu: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.enterButton = this.enterButton.bind(this);
    this.leaveButton = this.leaveButton.bind(this);
    this.enterMenu = this.enterMenu.bind(this);
    this.leaveMenu = this.leaveMenu.bind(this);
  }
  
  public handleClick(event: React.SyntheticEvent) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  public handleClose() {
    this.setState({ mouseOverButton: false, mouseOverMenu: false });
  };

  public enterButton() {
    this.setState({ mouseOverButton: true });
  }

  public leaveButton() {
    // Set a timeout so that the menu doesn't close before the user has time to
    // move their mouse over it
    setTimeout(() => {
      this.setState({ mouseOverButton: false });
    }, timeoutLength);
  }

  public enterMenu() {
    this.setState({ mouseOverMenu: true });
  }

  public leaveMenu() {
     setTimeout(() => {
      this.setState({ mouseOverMenu: false });
     }, timeoutLength);
  }

  public render() {

    return (
        <div>
        Inside Mapmenu
        </div>
    )
  }


}

export default MapMenu