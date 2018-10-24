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
  
});