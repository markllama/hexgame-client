//
//
//
import HexVector from './hexvector'
import Terrain from './terrain'
// import Token from './token'

export class HexMap {
  private Name: string,
  private Size: HexVector,
  private Terrains: Map<Terrain>
  // private Tokens: Token[]

  constructor(name: string, size: HexVector) {
    this.Name = name
    this.Size = size
    this.Terrains = new Map<Terrain>()
    // this.Tokens = []
  }

  get name():string { return this.Name }
  get size():HexVector { return this.Size }
  get terrains(): Map<Terrain> { return this.Terrains }

}

export default HexMap