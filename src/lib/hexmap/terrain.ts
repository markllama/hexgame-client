// A Hex game terrain
// import { HexVector } from './hexvector'

export class Terrain {
  private Name: string
  private Locations: HexVector[]

  public name() {
    return this.Name
  }

  public get locations() {
    return this.locations
  }
}

