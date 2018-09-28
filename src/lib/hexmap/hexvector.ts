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

  public add(other: HexVector) {
    return new HexVector(this.hx + other.hx, this.hy + other.hy);
  }

  public sub(other: HexVector) {
    return new HexVector(this.hx - other.hx, this.hy - other.hy);
  }

  public mul(factor: number) {
    return new HexVector(this.hx * factor, this.hy * factor)
  }
}


export default HexVector;