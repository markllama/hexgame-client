import * as React from 'react';
import './App.css';

import logo from './images/one_hex.png';

import HexmapCanvas from "./components/HexmapCanvas";
import HexVector from "./lib/hexmap/hexvector";
import HexMap from "./lib/hexmap/map";
import Terrain from "./lib/hexmap/terrain";

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
        <HexmapCanvas hexmap={hm} />
      </div>
    );
  }

  private createMap():HexMap {
    const size = new HexVector(15,21);
    const hm = new HexMap("testmap", size);

    const hills = new Terrain("hills", "hill")
    hills.locations.push(new HexVector(2, 3))
    
    const craters = new Terrain("craters", "crater")
    craters.locations.push(new HexVector(4, 9))

    hm.terrains.add(hills)
    hm.terrains.add(craters)
    
    return hm
  }

}

export default App;
