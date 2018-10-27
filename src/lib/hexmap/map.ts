//
//
//
import HexVector from './hexvector'
// import Terrain from './terrain'
// import Token from './token'

export class HexMap {
  public static ybias(hx:number):number { return Math.floor(hx / 2) }

  private Name: string;
  private Game: string;
  private Size: HexVector;
  // private Terrains: Set<Terrain>;
  // private Tokens: Token[]

  constructor(name: string, game: string, size: HexVector) {
    this.Name = name
    this.Game = game
    this.Size = size
    // this.Terrains = new Set<Terrain>()
    // this.Tokens = []
  }

  get name():string { return this.Name }
  get game():string { return this.Game }
  get size():HexVector { return this.Size }
  // get terrains():Set<Terrain> { return this.Terrains }
  // public terrainsAt(location?: HexVector): Set<Terrain> {
  //   if (location) {
  //     // add all the terrains that match the location
  //     const tset = new Set<Terrain>()
  //     this.Terrains.forEach((t:Terrain) => {
  //       // check that the location is in the terrain
  //       for (const l of t.locations) {
  //         if (location.eq(l)) {
  //           tset.add(t)
  //           break
  //         }
  //       }
  //     });
  //     return tset
  //   }
  //   return this.Terrains
  // }

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