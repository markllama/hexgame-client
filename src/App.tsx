
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import * as React from 'react';
import { HashRouter as Router } from "react-router-dom";
// import { NavLink, Route, HashRouter as Router } from "react-router-dom";

import { HexmapCanvas, Orientation } from "./components/HexmapCanvas";

import './App.css';

import logo from './images/one_hex.png';

class App extends React.Component {

  public render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to the Hexgame Server</h1>
        </header>

        <AppBar position="static" color="primary">
          <Toolbar>
            <Button>
            <Typography variant="h6" color="secondary">
            File
            </Typography>
            </Button>
            <Typography variant="h6" color="inherit">
            Edit
            </Typography>
          </Toolbar>
        </AppBar>

        <div>
          <HexmapCanvas hexmapurl={"./samplemap.json"} orientation={Orientation.Landscape} hexrun={30}/>
        </div>
        </div>
      </Router>
    );
  }

}


export default App;
