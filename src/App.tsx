import * as React from 'react';
import './App.css';

import logo from './images/one_hex.png';

import { HexmapCanvas, Orientation } from "./components/HexmapCanvas";
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
        <HexmapCanvas hexmap={hm} orientation={Orientation.Landscape} hexrun={30}/>
      </div>
    );
  }

  private createMap():HexMap {
    const size = new HexVector(15,22);
    const hm = new HexMap("testmap", "testgame", size);

    const hills = new Terrain("hills", "hill", new Array<HexVector>())
    hills.locations.push(new HexVector(0, 0))
    hills.locations.push(new HexVector(6, 17))
    hills.locations.push(new HexVector(12, 24))
    hills.locations.push(new HexVector(10, 14))
    hills.locations.push(new HexVector(4, 22))
    
    const craters = new Terrain("craters", "crater")
    craters.locations.push(new HexVector(14, 9))
    craters.locations.push(new HexVector(12, 4))
    craters.locations.push(new HexVector(13, 18))
    craters.locations.push(new HexVector(9, 21))
    craters.locations.push(new HexVector(7 , 14))
    craters.locations.push(new HexVector(3 , 20))
    craters.locations.push(new HexVector(6, 6))

    hm.terrains.add(hills)
    hm.terrains.add(craters)
    
    return hm
  }

}

export default App;
