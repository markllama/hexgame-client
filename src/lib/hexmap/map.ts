//
//
import { JsonObject, JsonProperty } from 'json2typescript'
//
import HexVector from './hexvector'
import Terrain from './terrain'
// import Token from './token'

@JsonObject
export class HexMap {
  public static ybias(hx:number):number { return Math.floor(hx / 2) }

  @JsonProperty("name", String)
  public name: string;
  @JsonProperty("game", String)
  public game: string;
  @JsonProperty("size", HexVector, true)
  public size: HexVector;
  @JsonProperty("terrains", [Terrain], true)
  public terrains: Set<Terrain>;
  // private Tokens: Token[]

  constructor(name: string="", game: string="", size: HexVector=new HexVector(), terrains?: Terrain[]) {
    this.name = name
    this.game = game
    this.size = size
    if (terrains) {
      this.terrains = new Set<Terrain>(terrains)
    } else {
      this.terrains = new Set<Terrain>()
    }

    // this.Tokens = []
  }

  public terrainsAt(location?: HexVector): Set<Terrain> {
     if (location) {
      // add all the terrains that match the location
      const tset = new Set<Terrain>()
      this.terrains.forEach((t:Terrain) => {
        // check that the location is in the terrain
        for (const l of t.locations) {
          if (location.eq(l)) {
            tset.add(t)
            break
          }
        }
      });
      return tset
    }
    return this.terrains
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