export class HexVector {
  private hX: number;
  private hY: number;

  constructor(hx=0, hy=0) {
    this.hX = hx,
    this.hY = hy
  }

  public toString = () : string => {
    return '(' + this.hX + ',' + this.hY + ')';
  }

  get hx():number { return this.hX }
  get hy():number { return this.hY }
  get hz():number { return this.hY - this.hY }

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