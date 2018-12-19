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

  const samples = [
    { mh: new HexVector(0, 0), center: new HexVector(0, 0) },
    { mh: new HexVector(1, 0), center: new HexVector(2, 3) },
    { mh: new HexVector(2, 0), center: new HexVector(4, 6) },
    { mh: new HexVector(3, 0), center: new HexVector(7, 7) },
    { mh: new HexVector(4, 0), center: new HexVector(9, 10) },

    { mh: new HexVector(0, 1), center: new HexVector(-1, 2) },
    { mh: new HexVector(1, 1), center: new HexVector(1, 5) },
    { mh: new HexVector(2, 1), center: new HexVector(3, 8) },
    { mh: new HexVector(3, 1), center: new HexVector(6, 9) },
    { mh: new HexVector(4, 1), center: new HexVector(8, 12) },

    { mh: new HexVector(0, 2), center: new HexVector(-2, 4) },
    { mh: new HexVector(1, 2), center: new HexVector(0, 7) },
    { mh: new HexVector(2, 2), center: new HexVector(2, 10) },
    { mh: new HexVector(3, 2), center: new HexVector(5, 11) },
    { mh: new HexVector(4, 2), center: new HexVector(7, 14) },

    { mh: new HexVector(0, 3), center: new HexVector(-3, 6) },
    { mh: new HexVector(1, 3), center: new HexVector(-1, 9) },
    { mh: new HexVector(2, 3), center: new HexVector(1, 12) },
    { mh: new HexVector(3, 3), center: new HexVector(4, 13) },
    { mh: new HexVector(4, 3), center: new HexVector(6, 16) },

    { mh: new HexVector(0, 4), center: new HexVector(-4, 8) },
    { mh: new HexVector(1, 4), center: new HexVector(-2, 11) },
    { mh: new HexVector(2, 4), center: new HexVector(0, 14) },
    { mh: new HexVector(3, 4), center: new HexVector(3, 15) },
    { mh: new HexVector(4, 4), center: new HexVector(5, 18) },

  ]

  it("mhCenter", () => {
    samples.forEach( (s) => {
      const center = m0.mhCenter(s.mh)
      expect(center.hx).toBe(s.center.hx)
      expect(center.hy).toBe(s.center.hy)
    })
  })

  it("megaHex", () => {
    samples.forEach( (s) => {
      const mh = m0.megaHex(s.center)
      // expect(mh.hx).toBe(s.mh.hx)
      expect(mh.hy).toBe(s.mh.hy)
    })
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