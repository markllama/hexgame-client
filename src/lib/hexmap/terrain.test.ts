import { JsonConvert } from 'json2typescript'
// import { HexVector } from './hexvector'
import { Terrain } from './terrain'

describe('<Terrain>', () => {

  const obj = {name: "hello", type: "foo"}
  
  it("constructor", () => {
    const t0 = new Terrain("hello", "foo")
    const t1 = obj as Terrain
    // const t0:Terrain = <Terrain>obj
    expect(t0.name).toEqual("hello")
    expect(t0.type).toEqual("foo")

   // t0.addLocation(new HexVector())

   // expect(t0.locations).toBeTruthy()

    expect(t1.name).toBe("hello")
  })

  it('JSON', () => {
    const jsonConvert: JsonConvert = new JsonConvert();

    const jsonStringT0 = '{"name":"simple", "type":"sample"}'
    const jsonT0 = JSON.parse(jsonStringT0)
    const t0 = jsonConvert.deserializeObject(jsonT0, Terrain)
    expect(t0.name).toEqual("simple")
    expect(t0.type).toEqual("sample")
    expect(t0.locations.length).toEqual(0)

    const jsonStringT1 = '{"name":"one", "type":"crater", "layer":0, "locations": [{"hx":3, "hy": 4}]}'
    const jsonT1 = JSON.parse(jsonStringT1)
    const t1 = jsonConvert.deserializeObject(jsonT1, Terrain)
    
    expect(t1.name).toEqual("one")
    expect(t1.type).toEqual("crater")
    expect(t1.locations.length).toEqual(1)
  });
});