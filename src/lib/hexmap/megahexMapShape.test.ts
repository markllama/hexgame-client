import HexVector from './hexvector';
import MegahexMapShape from './megahexMapShape';

describe('MegahexMapShape', () => {
  const m0 = new MegahexMapShape(new HexVector(1, 1))

  it("static Megahex", () => {
    expect(m0.Megahex.length).toBe(7)
    
    expect(m0.Megahex[3].hx).toBe(0)
    expect(m0.Megahex[3].hy).toBe(0)

    expect(m0.Megahex[0].hx).toBe(-1)
    expect(m0.Megahex[0].hy).toBe(-1)

    expect(m0.Megahex[6].hx).toBe(1)
    expect(m0.Megahex[6].hy).toBe(1)
  })

  it("constructor", () => {
    expect(m0.size.hx).toBe(1)
    expect(m0.size.hy).toBe(1)
  })

  it("mhCenter", () => {
    const c0 = m0.mhCenter(new HexVector())

    expect(c0.hx).toBe(0)
    expect(c0.hy).toBe(0)
    
    const c1 = m0.mhCenter(new HexVector(1, 0))

    expect(c1.hx).toBe(3)
    expect(c1.hy).toBe(1)

     const c2 = m0.mhCenter(new HexVector(0, 1))

    expect(c2.hx).toBe(-1)
    expect(c2.hy).toBe(2)

  })

  it("mhTranslate", () => {
    const mh0 = m0.mhTranslate(new HexVector())
    expect(mh0.length).toBe(7)
    expect(mh0[0]).toBeDefined()
    expect(mh0[3].hx).toBe(0)
    expect(mh0[3].hy).toBe(0)
  });
  
  it("all", () => {
    const m0Hexes = m0.all()
    expect(m0Hexes.length).toEqual(7)
    expect(m0Hexes[3].hx).toEqual(0)
  })
)