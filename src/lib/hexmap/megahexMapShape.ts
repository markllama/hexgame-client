//
// Define the standard sawtooth shaped rectangular maps for Metagames
//
import HexVector from './hexvector'
import IMapShape from './mapShape'

// function ybias(hx:number):number { return Math.floor(hx / 2) }

export const Megahex = [
  new HexVector( 0,  0),
  new HexVector( 0,  1),
  new HexVector( 1,  0), 
  new HexVector( 1,  1),
  new HexVector(-1, -1),
  new HexVector(-1,  0),
  new HexVector( 0, -1),
]  

const xShift = new HexVector(2, 3)
const yShift = new HexVector(-1, 2)

// when a hex is normalized to (hx=0, hy % 7) which unit hex will move it to
// center
const recenter = [ 3, 6, 0, 4, 5, 1, 2 ]

export class MegahexMapShape implements IMapShape {

  public size: HexVector;

  constructor(size: HexVector) {
    this.size = size
  }

  // I noticed several things about Megahexes:
  // 1) In an hx column, every 7th hex is a MH center.
  // 2) When hx increases by 1, the next center is at hy+5 (or -2)
  // 3) This pattern again repeats every 7th hy.
  // 4) The six hexes from {hx: 0, hy: [1-6]} are all 1 hex from a MH center
  // 5) Each of those hexes 
  // 4) When a hexvector is "normalized" to hx=0, placing the megahex origin at
  //    {hx: 0, hy: 0} each of the hexes hy=[1-6] represents a unit hexvector
  //    to a MH center
  public normalize(hv: HexVector): number {
    let xmod = hv.hx % 7
    if (xmod < 0) { xmod += 7 }
    
    let ymod = ((2 * xmod) + hv.hy) % 7
    if (ymod < 0) { xmod += 7 }

    return ymod
  }

  // Get the center of a given megahex
  public mhCenter(mh: HexVector): HexVector {
    //
    const xdiff = xShift.mul(mh.hx)
    const ydiff = yShift.mul(mh.hy - Math.floor(mh.hx / 3))
    return xdiff.add(ydiff)
  }

  public megaHex(hv: HexVector): HexVector {
    const my = Math.floor((hv.hy - hv.hx) / 3)

    // subtract that much y?
    const xref = hv.sub(yShift.mul(my))
    const mx = (Math.floor(xref.hx / 7) * 3) + (xref.hy - xref.hx)
    // const mx = Math.ceil((hv.hy+my) / 3)
    return new HexVector(mx, my)
  }
  
  public mhTranslate(center: HexVector): HexVector[] {
    return Megahex.map( (hv) => center.add(hv) )
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
