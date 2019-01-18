//
// Define the standard sawtooth shaped rectangular maps for Metagames
//
import HexVector from './hexvector'
import IMapShape from './mapShape'

function ybias(hx:number):number { return Math.floor(hx / 2) }

export class SawtoothMapShape implements IMapShape {

  public readonly name: string;
  public readonly size: HexVector;
  public readonly exclude: HexVector[];

  constructor(size: HexVector, exclude: HexVector[]=new Array<HexVector>()) {
    this.name = "sawtooth"
    this.size = size
    this.exclude = exclude
  }

  get rotation(): number { return 0 }

  public pixelOrigin(hexrun: number): HexVector {
    return new HexVector(hexrun * 2, hexrun * 4 * Math.sqrt(2/3))
  }
  
  public contains(hv: HexVector):boolean {
    // In the first two columns, things are what you expect
    // from then on the first and last hex increases by one for every two
    if (hv.hx < 0 || hv.hx >= this.size.hx) { return false }
    if (hv.hy < ybias(hv.hx) || hv.hy >= this.size.hy + ybias(hv.hx)) {
      return false
    }
    return true
  }

  public all(): HexVector[] {
    const hexes = new Array<HexVector>();
    const exclude = new Set<HexVector>(this.exclude)
    let row = 0
    let col = 0
   
    for (col = 0 ; col < this.size.hx ; col++) {
      const bias = ybias(col);
      for (row = 0 ; row < this.size.hy ; row++) {
        // look up the terrain canvas object, create them and pass them into
        // the CanvasHex
        const loc = new HexVector(col, row + bias)
        if (!exclude.has(loc)) {
          hexes.push(loc);
        }
      }
    }
    
    return hexes;
  }

  public borders(): {low: HexVector, high: HexVector} {
    return {low: new HexVector(), high: this.size}
  }
}

export default SawtoothMapShape
