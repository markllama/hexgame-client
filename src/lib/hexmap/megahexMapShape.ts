//
// Define the standard sawtooth shaped rectangular maps for Metagames
//
import HexVector from './hexvector'
import IMapShape from './mapShape'

function ybias(hx:number):number { return Math.floor(hx / 2) }

export class MegahexMapShape implements IMapShape {

  public size: HexVector;

  constructor(size: HexVector) {
    this.size = size
  }

  public const Megahex: HexVector[] = [
    {hx: -1, hy: -1}, {hx: -1, hy: 0},
    {hx: 0, hy: -1), {hx: 0, hy: 0}, {hx: 0, hy: 1},
    {hx: 1, hy: 0}, {hx: 1, hy: 1}
  ]

  public mhCenter(mh: HexVector): HexVector  {
    return new HexVector(mh.hx*3 - mh.hy, mh.hx + mh.hy*2)
  }

  public mhTranslate(center: HexVector): HexVector[] {
    return this.Megahex.map((hv) => {center.add(hv)})
  }
  
  // public contains(hv: HexVector):boolean {
  //   // In the first two columns, things are what you expect
  //   // from then on the first and last hex increases by one for every two
  //   if (hv.hx < 0 || hv.hx >= this.size.hx) { return false }
  //   if (hv.hy < ybias(hv.hx) || hv.hy >= this.size.hy + ybias(hv.hx)) {
  //     return false
  //   }
  //   return true
  // }

  public all(): HexVector[] {
    let hexes = new Array<HexVector>()
    let row = 0
    let col = 0
   
    for (col = 0 ; col < this.size.hx ; col++) {
      for (row = 0 ; row < this.size.hy ; row++) {
        const mhc = this.mhCenter(new HexVector(col, row))
        hexes = hexes.concat(this.mhTranslate(mhc))
      }
    }
    return hexes;
  }
}

export default MegahexMapShape
