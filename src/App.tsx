import * as React from 'react';

import './App.css';

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
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <HexmapCanvas hexmapurl={"./samplemap.json"} orientation={Orientation.Landscape} hexrun={30}/>
      </div>
    );
  }

}


export default App;
