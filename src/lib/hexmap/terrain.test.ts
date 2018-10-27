import { JsonConvert } from 'json2typescript'
import HexVector from './hexvector'
import Terrain from './terrain'

describe('<Terrain>', () => {

  const obj = {name: "hello", type: "foo"}
  
  it("constructor", () => {
    const t0 = new Terrain("hello", "foo")
    const t1 = obj as Terrain
    // const t0:Terrain = <Terrain>obj
    expect(t0.name).toEqual("hello")
    expect(t0.type).toEqual("foo")

    t0.addLocation(new HexVector())

    expect(t0.locations).toBeTruthy()

    expect(t1.name).toBe("hello")
  })

  it('JSON', () => {
    const jsonStringT0 = '{"name":"simple","type":"simpler"}'
    const jsonT0 = JSON.parse(jsonStringT0)

    const jsonConvert: JsonConvert = new JsonConvert();

    const t0 = jsonConvert.deserializeObject(jsonT0, Terrain)
    expect(t0.name).toEqual("simple")
    expect(t0.locations.length).toEqual(0)
  });
});