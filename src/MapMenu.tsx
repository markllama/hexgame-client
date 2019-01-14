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

    this.handleClose = this.handleClose.bind(this);
    this.enterButton = this.enterButton.bind(this);
    this.leaveButton = this.leaveButton.bind(this);
    this.enterMenu = this.enterMenu.bind(this);
    this.leaveMenu = this.leaveMenu.bind(this);
  }

  public handleClose() {
    this.setState({ mouseOverButton: false, mouseOverMenu: false });
  };

  public enterButton(event: React.SyntheticEvent) {
    this.setState({ mouseOverButton: true, anchorEl: event.currentTarget });
  }

  public leaveButton() {
    // Set a timeout so that the menu doesn't close before the user has time to
    // move their mouse over it
    setTimeout(() => {
      this.setState({ mouseOverButton: false });
    }, timeoutLength);
  }

  public enterMenu(event: React.SyntheticEvent) {
    this.setState({ mouseOverMenu: true, anchorEl: event.currentTarget });
  }

  public leaveMenu() {
     setTimeout(() => {
      this.setState({ mouseOverMenu: false });
     }, timeoutLength);
  }

  public render() {

    const open: boolean = (this.state.mouseOverButton || this.state.mouseOverMenu);

    const iconButton = 
        <IconButton
          aria-owns={this.state.open ? 'map-menu' : undefined}
          aria-haspopup="true"
          onMouseEnter={this.enterButton}
          onMouseLeave={this.leaveButton}>
          Maps
        </IconButton>
    

    return (
      <div>
        {iconButton}
        <Menu id="map-menu"
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