import { IconButton, Menu, MenuItem, MenuList, Typography } from "@material-ui/core";
import * as React from 'react';
import { NavLink } from "react-router-dom";

export class MapMenu extends React.Component {

  public state = {
    anchorEl: null
  };

  public render() {

    const { anchorEl } = this.state;
    // const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    
    return (
      <div>
        <IconButton onClick={this.handleMenuOpen} >Maps</IconButton>
        <Menu id="map-menu"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={this.handleMenuClose}
        >
          <MenuList>
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
          </MenuList>
        </Menu>
        </div>
    )
  }
  private handleMenuOpen = (event: React.SyntheticEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

}

export default MapMenu