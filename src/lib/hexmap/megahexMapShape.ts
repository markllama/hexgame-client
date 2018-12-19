//
// Define the standard sawtooth shaped rectangular maps for Metagames
//
import HexVector from './hexvector'
import IMapShape from './mapShape'

function ybias(hx:number):number { return Math.floor(hx / 2) }

const Megahex: HexVector[] = [
  new HexVector(-1, -1),
  new HexVector(-1,  0),
  new HexVector( 0, -1),
  new HexVector( 0,  0),
  new HexVector( 0,  1),
  new HexVector( 1,  0),
  new HexVector( 1,  1)
]

const xShift = new HexVector(2, 3)
const yShift = new HexVector(-1, 2)

export class MegahexMapShape implements IMapShape {

  public size: HexVector;

  constructor(size: HexVector) {
    this.size = size
  }

  public mhCenter(mh: HexVector): HexVector {
    //
    const xdiff = xShift.mul(mh.hx)
    const ydiff = yShift.mul(mh.hy - Math.floor(mh.hx / 3))
    return xdiff.add(ydiff)
  }

  public megaHex(hv: HexVector): HexVector {
    const my = Math.floor((hv.hy - hv.hx) / 3)
    const mx = Math.ceil((hv.hy+my) / 3)
    return new HexVector(mx, my)
  }
  
  public mhTranslate(center: HexVector): HexVector[] {
    return Megahex.map((hv) => {return center.add(hv)})
  }
  
  public contains(hv: HexVector):boolean {
    // which column triple
    
    // which hex?

    return true
  }

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
