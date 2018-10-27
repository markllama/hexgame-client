import HexVector from './hexvector';
import HexMap from './map';
// import Terrain from "./terrain"

describe('<HexMap>', () => {
  it ('constructor', () => {
    const s0 = new HexVector(15, 22)
    const hm0 = new HexMap("Test Map", 'testgame', s0)
    expect(hm0).toBeTruthy()

    expect(hm0.name).toBe("Test Map")
    expect(hm0.size).toBe(s0)
//    expect(hm0.terrains).toEqual(new Set())

//    expect(hm0.terrains.size).toEqual(0)
  });

  it ('ybias', () => {
    expect(HexMap.ybias(0)).toEqual(0)
    expect(HexMap.ybias(1)).toEqual(0)
    expect(HexMap.ybias(2)).toEqual(1)
    expect(HexMap.ybias(3)).toEqual(1)
    expect(HexMap.ybias(4)).toEqual(2)
    expect(HexMap.ybias(5)).toEqual(2)
  });

  const hm1 = new HexMap("Test Map", 'testgame', new HexVector(15, 22))

  const inside = [
    new HexVector(0, 0),
    new HexVector(0, hm1.size.hy-1),
    new HexVector(hm1.size.hx-1, HexMap.ybias(hm1.size.hx)),
    new HexVector(hm1.size.hx-1, hm1.size.hy + HexMap.ybias(hm1.size.hx)-1)
  ]

  const outside = [
    // off the x edges
    new HexVector(-1, 0),
    new HexVector(-1, hm1.size.hy - 1),

    new HexVector(hm1.size.hx, 9)
    new HexVector(hm1.size.hx, 22)

    // inside x, off the y edges
    new HexVector(0, -1),
    new HexVector(0, hm1.size.hy),
   new HexVector(1, -1),
    new HexVector(1, hm1.size.hy),

    new HexVector(2, 0),
    new HexVector(2, hm1.size.hy + HexMap.ybias(2)),
    new HexVector(3, 0),
    new HexVector(3, hm1.size.hy + HexMap.ybias(3)),

    new HexVector(hm1.size.hx - 1, HexMap.ybias(hm1.size.hx-1)-1),
    new HexVector(hm1.size.hx - 1, hm1.size.hy + HexMap.ybias(hm1.size.hx-1))

    new HexVector(hm1.size.hx, HexMap.ybias(hm1.size.hx)-1),
    new HexVector(hm1.size.hx, hm1.size.hy + HexMap.ybias(hm1.size.hx))
  ]

  it("contains:inside", () => {
    for (const i of inside) {
      expect(hm1.contains(i)).toBeTruthy()
    }
  });

  it("contains:outside", () => {
    for (const o of outside) {
      expect(hm1.contains(o)).toBeFalsy()
    }
  });
  
  // it ('addTerrain', () => {
  //   const hm0 = new HexMap("Test Map", 'testgame', new HexVector(15, 22))
  //   const t0 = new Terrain("hills", "hill")
  //   const h0 = new HexVector(4, 4)
  //   t0.locations[-1] = h0
  
  //   const t1 = new Terrain("craters", "crater")
    
  //   expect(hm0.terrains.size).toEqual(0)
  //   hm0.terrains.add(t0)
  //   expect(hm0.terrains.size).toEqual(1)
  //   hm0.terrains.add(t1)
  // });

  // it ('terrains by location', () => {
  //   const hm0 = new HexMap("Test Map", 'testgame', new HexVector(15, 22))
  //   const t0 = new Terrain("hills", "hill")
  //   const l0 = new HexVector(6, 10)
  //   t0.addLocation(l0)

  //   const t1 = new Terrain("craters", "crater")
  //   const l1 = new HexVector(4, 5)
  //   expect(t1.locations).toMatchObject(new Array<HexVector>())
  //   t1.addLocation(l1)
  //   expect(t1.locations.length).toEqual(1)
    
  //   expect(hm0.terrains.size).toEqual(0)
  //   hm0.terrains.add(t0)
  //   expect(hm0.terrains.size).toEqual(1)
  //   hm0.terrains.add(t1)

  //   expect(hm0.terrains.size).toBe(2)
  //   expect(hm0.terrainsAt(l1).size).toBe(1)

  //   expect(hm0.terrainsAt(new HexVector(4, 5)).size).toBe(1)
  // });
});