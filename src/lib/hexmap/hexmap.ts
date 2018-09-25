import Hex from './hex'
import HexVector from './hexvector'

export class HexMap {
  // private name: string
  // private game: string
  private Size: HexVector
  private Origin: HexVector

  // private terrains: []
  // private tokens: []

  constructor(size: HexVector, origin = new HexVector()) {
    this.Size = size
    this.Origin = origin
  }

  // this still needs adjustment for negative numbers
  private yBias(hx:number) {
    return Math.floor(hx / 2)
  }
  
  get size() { return this.Size }
  get origin() { return this.Origin }

  get array() {

    const hexArray = Hex[]
    
    for (let col = 0 ; col < this.Size.hx ; col++) {
      const ybias = this.yBias(col)
      for (let row = 0 ; row < this.Size.hy ; row++) {
        hexArray.add(new Hex(new HexVector(col, row + ybias)))
      }
    }

    return hexArray
  }
  
}

export default HexMap
