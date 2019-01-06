import { IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import * as React from 'react';
import { NavLink } from "react-router-dom";

const timeoutLength = 300;

export class MapMenu extends React.Component {

  public state = {
    anchorEl: null,
    // Keep track of whether the mouse is over the button or menu
    mouseOverButton: false,
    mouseOverMenu: false,
    open: false,
  };

  constructor(props: {}) {
    super(props)
    this.state =  {
      anchorEl: null,
      // Keep track of whether the mouse is over the button or menu
      mouseOverButton: false,
      mouseOverMenu: false,
      open: false,
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

    const open: boolean = (this.state.mouseOverButton || this.state.mouseOverMenu);

    return (
      <div>
        <IconButton
          aria-owns={this.state.open ? 'map-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          onMouseEnter={this.enterButton}
          onMouseLeave={this.leaveButton}
        >Maps</IconButton>
        <Menu id="map-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={this.handleClose}
          MenuListProps={{
            onMouseEnter: this.enterMenu,
            onMouseLeave: this.leaveMenu,
          }}
        >
            <MenuItem>
              <Typography variant="h6" color="inherit">
                <NavLink to="/map/samplemap">Sample Map</NavLink>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="h6" color="inherit">
                <NavLink to="/map/melee">Melee Map</NavLink>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="h6" color="inherit">
                <NavLink to="/map/wizard">Wizard Map</NavLink>
              </Typography>
            </MenuItem>
        </Menu>
        </div>
    )
  }


}

export default MapMenu