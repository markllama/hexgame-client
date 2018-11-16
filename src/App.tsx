import { JsonConvert } from 'json2typescript'

import * as React from 'react';

import './App.css';

import logo from './images/one_hex.png';

import { HexmapCanvas, Orientation } from "./components/HexmapCanvas";
// import HexVector from "./lib/hexmap/hexvector";
import HexMap from "./lib/hexmap/map";
// import Terrain from "./lib/hexmap/terrain";


class App extends React.Component {

  public render() {
    const hm = this.createMap()
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to the Hexgame Server</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <HexmapCanvas hexmap={hm} orientation={Orientation.Landscape} hexrun={30}/>
      </div>
    );
  }

  private createMap():HexMap {

    const hmJson = require('./samplemap.json')
    // const hmObject = JSON.parse(hmJson)
    const jsonConvert: JsonConvert = new JsonConvert();
    const hm = jsonConvert.deserialize(hmJson, HexMap)
    
    
    return hm
  }

}


export default App;
