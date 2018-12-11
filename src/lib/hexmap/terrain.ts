
import { JsonObject, JsonProperty } from 'json2typescript'

// A Hex game terrain
import { HexVector } from './hexvector'


@JsonObject('terrain')
export class Terrain {
  
  @JsonProperty("name", String)
  public name: string
  @JsonProperty("type", String, true)
  public type: string
  @JsonProperty("locations", [HexVector], true)
  public locations: HexVector[]
  @JsonProperty("parameters", Object, true)
  public parameters: object

  constructor(name: string="", type: string="", locations?: HexVector[], parameters?: {}) {
  //  constructor(name: string, type: string) {
    this.name = name
    this.type = type
    if (locations) {
      this.locations = locations
    } else {
      this.locations = new Array<HexVector>()
    }
    if (parameters) {
      this.parameters = parameters
    } else {
      this.parameters = {}
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