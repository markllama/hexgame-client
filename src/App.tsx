import * as React from 'react';
import './App.css';

import logo from './images/one_hex.png';

import HexmapCanvas from "./components/HexmapCanvas";
import HexVector from "./lib/hexmap/hexvector";
import HexMap from "./lib/hexmap/map";

class App extends React.Component {
  public render() {
    const size = new HexVector(15,21);
    const hm = new HexMap("testmap", size);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to the Hexgame Server</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <HexmapCanvas hexmap={hm} />
      </div>
    );
  }
}

export default App;
