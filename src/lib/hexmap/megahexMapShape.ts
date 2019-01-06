//
// Define the standard sawtooth shaped rectangular maps for Metagames
//
import HexVector from './hexvector'
import IMapShape from './mapShape'

// function ybias(hx:number):number { return Math.floor(hx / 2) }

export const Megahex = [
  new HexVector( 0,  0),
  new HexVector( 0,  -1),
  new HexVector( 1,  0), 
  new HexVector( 1,  1),
  new HexVector( 0,  1),
  new HexVector(-1,  0),
  new HexVector(-1, -1),
]  

// hx = (3mx - my), hy = (mx + 2my)
//                  hy - 2my = mx
// hx = 3(hy - 2my) = my
// hx = 3hy - 6my - my
// hx = 3hy - 7my
// hx + 7my = 3hy
// 7my = 3hy - hx
// my = (3hy - hx)/7
//
//                  hy = mx + 2my
//                  mx = hy - 2my

const xShift = new HexVector(3, 1)
const yShift = new HexVector(-1, 2)

// when a hex is normalized to (hx=0, hy % 7) which unit hex will move it to
// center
// const recenter = [ 3, 6, 0, 4, 5, 1, 2 ]

export class MegahexMapShape implements IMapShape {

  public readonly name: string;
  public size: HexVector;
  public readonly exclude: HexVector[];

  constructor(size: HexVector, exclude: HexVector[] = new Array<HexVector>()) {
    this.name = "megahex"
    this.size = size
    this.exclude = exclude
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
    
    const ymod = ((2 * xmod) + hv.hy) % 7
    if (ymod < 0) { xmod += 7 }

    return ymod
  }

  // Get the center of a given megahex
  public mhCenter(mh: HexVector): HexVector {
    //
    const xdiff = xShift.mul(mh.hx)
    const ydiff = yShift.mul(mh.hy)
    return xdiff.add(ydiff)
  }

  // return the megahex which contains the given hex
  public megaHex(hv: HexVector): HexVector {

    const my = (3*hv.hy - hv.hx) / 7.0
    const mx = hv.hy - 2*my

    // now you can round both off
    const mxi = Math.round(mx)
    const myi = Math.round(my)

    return new HexVector(mxi, myi)
  }
  
  public mhTranslate(center: HexVector): HexVector[] {
    return Megahex.map( (hv) => center.add(hv) )
  }
  
  public contains(hv: HexVector):boolean {

    // if it's in the exclude list, it's not on the map
    
    // which megahex?
    const mh = this.megaHex(hv)

    // is the mh outside the x boundaries?
    if (mh.hx < 0 || mh.hx >= this.size.hx) {
      return false
    }

    // is the mh outside the y boundaries?
    const myBias = mh.hx - (mh.hx / 3)

    if (mh.hy < myBias || mh.hy >= this.size.hy + myBias) {
      return false
    } 
    
    // console.log("should be outside: " + mh.toString())
    return true
  }

  public excluded(hex: HexVector) {
    for (const h of this.exclude) {
      if (hex.eq(h)) { return true }
    }
    return false
  }

  public allMegahexes(): HexVector[] {

    let col: number
    let row: number

    let mhexes = new Array<HexVector>()

    for (col = 0 ; col < this.size.hx ; col++) {
      const start = col - Math.floor(col / 3)
      const end = start + this.size.hy
      for (row = start ; row < end ; row++) {
        const hex = new HexVector(col,row)
        mhexes = mhexes.concat(hex)
      }
    } 

    return mhexes
  }
  
  public all(): HexVector[] {
    let hexes = new Array<HexVector>()

    this.allMegahexes().forEach( (mh) => {
     hexes = hexes.concat(this.mhTranslate(this.mhCenter(mh)))
    })

    return hexes;
  }

  public borders(): {low: HexVector, high: HexVector} {

    // find the low and high hx
    // this can clearly be optimized

    const allHexes = this.all()

    const allhx = allHexes.map((hv) => hv.hx)
    const xlow = Math.min.apply(null, allhx)
    const xhigh = Math.max.apply(null, allhx) + 1

    // find the extreme then normalize
    const yhexlow = allHexes.reduce((current, test) => {
      if (current.hy === test.hy) {
        return current.hx < test.hx ? current : test
      }
      return current.hy < test.hy ? current : test
    })
    const ylow = yhexlow.hy + Math.floor(yhexlow.hx / 2) - 1
    
    // // find the extreme then normalize
    const yhexhigh = allHexes.reduce((current, test) => {
      if (current.hy === test.hy) {
        return current.hx > test.hx ? current : test
      }
      return current.hy > test.hy ? current : test
    })
    const yhigh = yhexhigh.hy - Math.floor(yhexhigh.hx / 2) - 1

    
    return {low: new HexVector(xlow, ylow), high: new HexVector(xhigh, yhigh) }
  }
}

export default MegahexMapShape
