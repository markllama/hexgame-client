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

  // add terrain
  // del terrain
}

export default Hex;