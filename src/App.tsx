
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { HashRouter as Router, NavLink, Route, } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import { HexmapCanvas } from "./components/HexmapCanvas";

import './App.css';

import logo from './images/one_hex.png';

class App extends React.Component {

  public render() {

    const maps = [
      {name: "sample", url: "./samplemap.json" },
      {name: "melee",  url: "./meleemap.json"  },
      {name: "wizard", url: "./wizardmap.json" }
    ]

    const hm = () => <HexmapCanvas hexmapurl={maps[1].url} />
      
    return (
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="App-title">Welcome to the Hexgame Server</h1>
            </header>

            <AppBar position="static" color="default">
              <Toolbar>
                <IconButton className="menuButton" color="inherit" aria-label="Open drawer">
                  <MenuIcon />
                </IconButton>
                <Typography className="menu" variant="h6" color="inherit" noWrap={true}>
                Hexgame Server
                </Typography>
                &nbsp;
                <Typography variant="h6" color="inherit">
                  <NavLink to="/dashboard">Home</NavLink>
                </Typography>
                &nbsp;
                <Typography variant="h6" color="inherit">
                  <NavLink to="/map">Map</NavLink>
                </Typography>
              </Toolbar>
            </AppBar>

            <div className="content">
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/map" render={hm} />
            </div>
          </div>
      </Router>
    );
  }

}


export default App;
