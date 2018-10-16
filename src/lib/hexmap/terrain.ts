// A Hex game terrain
import { HexVector } from './hexvector'

export class Terrain {
  private Name: string
  private Type: string
  private Locations: HexVector[]

  constructor(name: string, type: string) {
    this.Name = name
    this.Type = type
    // this.Locations = new Array<HexVector>()
    this.Locations = new Array<HexVector>()
  }

  public get name() {
    return this.Name;
  }

  public get type() {
    return this.Type
  }

  public get locations() {
    return this.Locations;
  }

  public addLocation(newHv: HexVector) {
    // check if it's already in the list
    for (const i of this.Locations) {
      if (i.eq(newHv)) { return }
    }
    // add it if not
    this.Locations.push(newHv)
  }
}

export default Terrain