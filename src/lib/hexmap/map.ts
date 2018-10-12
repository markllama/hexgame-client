//
//
//
import HexVector from './hexvector'
import Terrain from './terrain'
// import Token from './token'

export class HexMap {
  public static ybias(hx:number):number { return Math.floor(hx / 2) }

  private Name: string;
  private Size: HexVector;
  private Terrains: Map<string, Terrain>;
  // private Tokens: Token[]

  constructor(name: string, size: HexVector) {
    this.Name = name
    this.Size = size
    this.Terrains = new Map<string, Terrain>()
    // this.Tokens = []
  }

  // create a sorted map of terrains by location
  public invertTerrains():Map<HexVector,Terrain[]> {

    const terrainLocations = new Map<HexVector,Terrain[]>()

    // terrainLocations.set(this.Terrains.get('craters').locations[0], this.Terrains.get('craters'))

    return terrainLocations
  }

  get name():string { return this.Name }
  get size():HexVector { return this.Size }
  get terrains(): Map<string, Terrain> { return this.Terrains }

  
  
  public contains(hv: HexVector):boolean {
    //
    // In the first two columns, things are what you expect
    // from then on the first and last hex increases by one for every two
    //

    if (hv.hx < 0 || hv.hx >= this.size.hx) { return false }
    if (hv.hy < HexMap.ybias(hv.hx) || hv.hy >= this.size.hy + HexMap.ybias(hv.hx)) {
      return false
    }
    return true
  }
}

export default HexMap