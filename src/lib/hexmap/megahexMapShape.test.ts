import HexVector from './hexvector';
import MegahexMapShape from './megahexMapShape';

describe('MegahexMapShape', () => {
  const m0 = new MegahexMapShape(new HexVector(1, 1))

  // it("static Megahex", () => {
  //   expect(MegahexMapShape.Megahex.length).toBe(7)
    
  //   expect(MegahexMapShape.Megahex[3].hx).toBe(0)
  //   expect(MegahexMapShape.Megahex[3].hy).toBe(0)

  //   expect(MegahexMapShape.Megahex[0].hx).toBe(-1)
  //   expect(MegahexMapShape.Megahex[0].hy).toBe(-1)

  //   expect(MegahexMapShape.Megahex[6].hx).toBe(1)
  //   expect(MegahexMapShape.Megahex[6].hy).toBe(1)
  // })

  it("constructor", () => {
    expect(m0.size.hx).toBe(1)
    expect(m0.size.hy).toBe(1)
  })

  it("mhCenter", () => {

    //
    const c0 = m0.mhCenter(new HexVector())
    expect(c0.hx).toBe(0)
    expect(c0.hy).toBe(0)
    
    const c1x0 = m0.mhCenter(new HexVector(1, 0))
    expect(c1x0.hx).toBe(2)
    expect(c1x0.hy).toBe(3)

    const c2x0 = m0.mhCenter(new HexVector(2, 0))
    expect(c2x0.hx).toBe(4)
    expect(c2x0.hy).toBe(6)

    const c3x0 = m0.mhCenter(new HexVector(3, 0))
    expect(c3x0.hx).toBe(7)
    expect(c3x0.hy).toBe(7)

    const c4x0 = m0.mhCenter(new HexVector(4, 0))
    expect(c4x0.hx).toBe(9)
    expect(c4x0.hy).toBe(10)

    //
    const c0x1 = m0.mhCenter(new HexVector(0, 1))
    expect(c0x1.hx).toBe(-1)
    expect(c0x1.hy).toBe(2)

    const c1x1 = m0.mhCenter(new HexVector(1, 1))
    expect(c1x1.hx).toBe(1)
    expect(c1x1.hy).toBe(5)

    const c2x1 = m0.mhCenter(new HexVector(2, 1))
    expect(c2x1.hx).toBe(3)
    expect(c2x1.hy).toBe(8)

    const c3x1 = m0.mhCenter(new HexVector(3, 1))
    expect(c3x1.hx).toBe(6)
    expect(c3x1.hy).toBe(9)
    
    const c4x1 = m0.mhCenter(new HexVector(4, 1))
    expect(c4x1.hx).toBe(8)
    expect(c4x1.hy).toBe(12)
    
    //
    const c0x2 = m0.mhCenter(new HexVector(0, 2))
    expect(c0x2.hx).toBe(-2)
    expect(c0x2.hy).toBe(4)

    const c1x2 = m0.mhCenter(new HexVector(1, 2))
    expect(c1x2.hx).toBe(0)
    expect(c1x2.hy).toBe(7)

    const c2x2 = m0.mhCenter(new HexVector(2, 2))
    expect(c2x2.hx).toBe(2)
    expect(c2x2.hy).toBe(10)

    const c3x2 = m0.mhCenter(new HexVector(3, 2))
    expect(c3x2.hx).toBe(5)
    expect(c3x2.hy).toBe(11)
    
    const c4x2 = m0.mhCenter(new HexVector(4, 2))
    expect(c4x2.hx).toBe(7)
    expect(c4x2.hy).toBe(14)
    
    //
    const c0x3 = m0.mhCenter(new HexVector(0, 3))
    expect(c0x3.hx).toBe(-3)
    expect(c0x3.hy).toBe(6)

    const c1x3 = m0.mhCenter(new HexVector(1, 3))
    expect(c1x3.hx).toBe(-1)
    expect(c1x3.hy).toBe(9)

    const c2x3 = m0.mhCenter(new HexVector(2, 3))
    expect(c2x3.hx).toBe(1)
    expect(c2x3.hy).toBe(12)

    const c3x3 = m0.mhCenter(new HexVector(3, 3))
    expect(c3x3.hx).toBe(4)
    expect(c3x3.hy).toBe(13)
    
    const c4x3 = m0.mhCenter(new HexVector(4, 3))
    expect(c4x3.hx).toBe(6)
    expect(c4x3.hy).toBe(16)

    //
    const c0x4 = m0.mhCenter(new HexVector(0, 4))
    expect(c0x4.hx).toBe(-4)
    expect(c0x4.hy).toBe(8)

    const c1x4 = m0.mhCenter(new HexVector(1, 4))
    expect(c1x4.hx).toBe(-2)
    expect(c1x4.hy).toBe(11)

    const c2x4 = m0.mhCenter(new HexVector(2, 4))
    expect(c2x4.hx).toBe(0)
    expect(c2x4.hy).toBe(14)

    const c3x4 = m0.mhCenter(new HexVector(3, 4))
    expect(c3x4.hx).toBe(3)
    expect(c3x4.hy).toBe(15)

    const c4x4 = m0.mhCenter(new HexVector(4, 4))
    expect(c4x4.hx).toBe(5)
    expect(c4x4.hy).toBe(18)


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

    const m2x2 = new MegahexMapShape(new HexVector(2, 2))

    const m2x2all = m2x2.all()
    expect(m2x2all.length).toEqual(28)
  })
)