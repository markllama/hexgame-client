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
  private Terrains: Set<Terrain>;
  // private Tokens: Token[]

  constructor(name: string, size: HexVector) {
    this.Name = name
    this.Size = size
    this.Terrains = new Set<Terrain>()
    // this.Tokens = []
  }

  get name():string { return this.Name }
  get size():HexVector { return this.Size }
  public terrains(location?: HexVector): Set<Terrain> {
    if (location) {
      const tset = new Set<Terrain>()

      this.Terrains.forEach((t, d, s) => {
        if (t.locations.has(location)) {
          tset.add(t)
        }
      });
      // add all the terrains that match the location
      return tset
      
    }
    return this.Terrains
  }

  
  
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