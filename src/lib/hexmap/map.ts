//
//
import { JsonObject, JsonProperty } from 'json2typescript'
//
import HexVector from './hexvector'
import IMapShape from './mapShape'
import MegahexMapShape from './megahexMapShape'
import SawtoothMapShape from './sawtoothMapShape'
import Terrain from './terrain'
// import Token from './token'

@JsonObject
export class HexMap {
  public static ybias(hx:number):number { return Math.floor(hx / 2) }

  @JsonProperty("name", String)
  public name: string;
  @JsonProperty("game", String)
  public game: string;
  @JsonProperty("copyright", String, true)
  public copyright: string;
  @JsonProperty("shape", String, true)
  public shape: string;
  @JsonProperty("size", HexVector, true)
  public size: HexVector;
  @JsonProperty("exclude", [HexVector], true)
  public exclude: HexVector[];
  @JsonProperty("terrains", [Terrain], true)
  public terrains: Set<Terrain>;
  // private Tokens: Token[]

  private mapShape: IMapShape
  
  constructor(name: string="",
              game: string="",
              size: HexVector=new HexVector(),
              shape: string="sawtooth",
              exclude: HexVector[] = new Array<HexVector>(),
              copyright: string="unset",
              terrains?: Terrain[]) {
    this.name = name
    this.game = game
    this.shape = shape
    this.copyright = copyright
    this.size = size
    this.exclude = exclude
    if (terrains) {
      this.terrains = new Set<Terrain>(terrains)
    } else {
      this.terrains = new Set<Terrain>()
    }

    this.initShape()
    // this.Tokens = []
  }

  get rotation() {
    return this.mapShape ? this.mapShape.rotation : 0
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
    if (!this.mapShape) {
      this.initShape()
    }
    return this.mapShape.contains(hv)
  }

  public all(): HexVector[] {
    if (!this.mapShape) {
      this.initShape()
    }
    return this.mapShape.all()
  }

  public initShape() {
    switch(this.shape) {
    case "sawtooth": {
      this.mapShape = new SawtoothMapShape(this.size, this.exclude)
      break;
    }

    case "megahex": {
      this.mapShape = new MegahexMapShape(this.size, this.exclude)
      break;
    }
      
    default: {
      this.mapShape = new SawtoothMapShape(this.size, this.exclude)
      break;      
    }
    }
  }

  public borders(): {low: HexVector, high: HexVector} {
    if (!this.mapShape) { this.initShape() }
    return this.mapShape.borders()
  }

  public shapeName(): string {
    if (!this.mapShape) { this.initShape() }
    return this.mapShape.name
  }

  public pixelOrigin(hexrun: number) {
    if (!this.mapShape) { this.initShape() }
    return this.mapShape.pixelOrigin(hexrun)    
  }
}

export default HexMap