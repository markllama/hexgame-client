//
// Define the standard sawtooth shaped rectangular maps for Metagames
//
import HexVector from './hexvector'
import MapShape from './mapShape'

function ybias(hx:number):number { return Math.floor(hx / 2) }

export class SawtoothMapShape implements MapShape {

  public size: HexVector;

  constructor(size: HexVector) {
    this.size = size
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

  public all() {
    const hexes = []HexVector;
    let row = 0
    let col = 0
   
    for (col = 0 ; col < this.size.hx ; col++) {
      const bias = ybias(col);
      for (row = 0 ; row < this.size.hy ; row++) {
        // look up the terrain canvas object, create them and pass them into
        // the CanvasHex
        rows.push(new HexVector(col, row + bias));
      }
    }
    return hexes;
  }
}

export default SawtoothMapShape
