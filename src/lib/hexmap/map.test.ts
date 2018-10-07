import HexVector from './hexvector';
import HexMap from './map';
import Terrain from "./terrain"

describe('<HexMap>', () => {
  it ('constructor', () => {
    const s0 = new HexVector(15, 22)
    const hm0 = new HexMap("Test Map", s0)
    expect(hm0).toBeTruthy()

    expect(hm0.name).toBe("Test Map")
    expect(hm0.size).toBe(s0)
    expect(hm0.terrains).toEqual(new Map())
    expect(hm0.terrains.size).toEqual(0)
  });

  it ('addTerrain', () => {
    const hm0 = new HexMap("Test Map", new HexVector(15, 22))
    const t0 = new Terrain("hill")
    
    expect(hm0.terrains.size).toEqual(0)
    hm0.terrains.set("hill", t0)
    expect(hm0.terrains.size).toEqual(1)
    hm0.terrains.set("dale", t0)

  });
});