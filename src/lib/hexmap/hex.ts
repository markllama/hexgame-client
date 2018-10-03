import HexVector from './hexvector'

export class Hex {
  private Location: HexVector
  // private Terrains: [] of Terrain

  constructor(location: HexVector) {
    this.Location = location
  }

  public get location() {
    return this.Location
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