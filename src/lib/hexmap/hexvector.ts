//
//
//
import { JsonObject, JsonProperty } from 'json2typescript'

@JsonObject('hexvector')
export class HexVector {

  @JsonProperty('hx', Number)
  public hx: number;
  @JsonProperty('hy', Number)
  public hy: number;

  constructor(hx=0, hy=0) {
    this.hx = hx,
    this.hy = hy
   }

  public toString = () : string => {
    return '(' + this.hx + ',' + this.hy + ')';
  }

  public toArray = (): number[] =>  [this.hx, this.hy]
  
  // get hx():number { return this.hX }
  // get hy():number { return this.hY }
  get hz():number { return this.hy - this.hx }

  get length():number {
    return Math.max(Math.abs(this.hx), Math.abs(this.hy), Math.abs(this.hz))
  }

  public eq(other: HexVector):boolean {
    return this.hx === other.hx && this.hy === other.hy
  }

  public add(other: HexVector):HexVector {
    return new HexVector(this.hx + other.hx, this.hy + other.hy);
  }

  public sub(other: HexVector):HexVector {
    return new HexVector(this.hx - other.hx, this.hy - other.hy);
  }

  public mul(factor: number):HexVector {
    return new HexVector(this.hx * factor, this.hy * factor)
  }

  public distance(other: HexVector):number {
    return this.sub(other).length
  }

}

export const ORIGIN = new HexVector()
export const UNIT: HexVector[] = [
  new HexVector( 0, -1),
  new HexVector( 1,  0),
  new HexVector( 1,  1),
  new HexVector( 0,  1),
  new HexVector(-1,  0),
  new HexVector(-1, -1),
  new HexVector(0, -1)
]

export default HexVector;