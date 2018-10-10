// A Hex game terrain
import { HexVector } from './hexvector'

export class Terrain {
  private Name: string
  private Type: string
  private Locations: HexVector[]

  constructor(name: string, type: string) {
    this.Name = name
    this.Type = type
    this.Locations = new Array<HexVector>()
  }

  public name() {
    return this.Name;
  }

  public type() {
    return this.Type
  }

  public get locations() {
    return this.Locations;
  }
}

export default Terrain