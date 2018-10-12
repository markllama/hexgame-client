import HexVector from './hexvector';
import Terrain from './terrain';

export class Hex {
  private Location: HexVector
  private Terrains: Terrain[]

  constructor(location: HexVector, terrains: Terrain[] = new Array<Terrain>()) {
    this.Location = location
    this.Terrains = terrains
  }

  public get location() {
    return this.Location
  }

  public get terrains() {
    return this.Terrains
  }

  public get hx() {
    return this.Location.hx
  }

  public get hy() {
    return this.Location.hy
  }

  public get hz() {
    return this.Location.hz
  }
  
  // add terrain
  // del terrain
}

export default Hex;