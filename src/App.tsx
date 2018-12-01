import * as React from 'react';

import './App.css';

import { AppBar, Toolbar, Typography } from "@material-ui/core";

import logo from './images/one_hex.png';

import { HexmapCanvas, Orientation } from "./components/HexmapCanvas";

class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to the Hexgame Server</h1>
        </header>

        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
            Photos
            </Typography>
          </Toolbar>
        </AppBar>

        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <HexmapCanvas hexmapurl={"./samplemap.json"} orientation={Orientation.Landscape} hexrun={30}/>
      </div>
    );
  }

}


export default App;
