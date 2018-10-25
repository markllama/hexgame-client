
import { JsonObject, JsonProperty } from 'json2typescript'

// A Hex game terrain
import { HexVector } from './hexvector'

// function serializable<T extends Type>(value: Type, Constructor: C): C | null {

// }


@JsonObject('terrain')
export class Terrain {

  @JsonProperty("name", String)
  public name: string
  @JsonProperty("type", String)
  public type: string
  @JsonProperty("locations", [HexVector], true)
  public locations: HexVector[]

  constructor(name: string, type: string, locations?: HexVector[]) {
    this.name = name
    this.type = type
    // this.Locations = new Array<HexVector>()

    if (locations === undefined) {
      this.locations = new Array<HexVector>()
    } else {
      this.locations = locations
    }
  }


  public addLocation(newHv: HexVector) {
    // check if it's already in the list
    for (const i of this.locations) {
      if (i.eq(newHv)) { return }
    }
    // add it if not
    this.locations.push(newHv)
  }
}

export default Terrain