import HexVector from './hexvector';
import SawtoothMapShape from './sawtoothMapShape';

describe('SawtoothMapShape', () => {
  const m0 = new SawtoothMapShape(new HexVector(15, 22))
  
  it('constructor', () => {

    expect(m0.size).toBeTruthy();

    expect(m0.size.hx).toEqual(15)
    expect(m0.size.hy).toEqual(22)
  })

  describe('contains', () => {
    // check the boundaries
    expect(m0.contains(new HexVector(-1,0))).toBeFalsy()
    expect(m0.contains(new HexVector(-1,20))).toBeFalsy()

    expect(m0.contains(new HexVector(15,6))).toBeFalsy()
    expect(m0.contains(new HexVector(15,25))).toBeFalsy()
    
    expect(m0.contains(new HexVector(0,-1))).toBeFalsy()
    expect(m0.contains(new HexVector(0,0))).toBeTruthy()
    expect(m0.contains(new HexVector(0,21))).toBeTruthy()
    expect(m0.contains(new HexVector(0,22))).toBeFalsy()

    expect(m0.contains(new HexVector(14,6))).toBeFalsy()
    expect(m0.contains(new HexVector(14,7))).toBeTruthy()
    expect(m0.contains(new HexVector(14,28))).toBeTruthy()
    expect(m0.contains(new HexVector(14,29))).toBeFalsy()
  })

  describe('all', () => {
    expect(m0.all().length).toBe(330)

    expect(m0.all()[0].eq(new HexVector(0,0))).toBeTruthy()
    expect(m0.all()[1].eq(new HexVector(0,1))).toBeTruthy()
    expect(m0.all()[21].eq(new HexVector(0,21))).toBeTruthy()

    expect(m0.all()[22].eq(new HexVector(1,0))).toBeTruthy()
    expect(m0.all()[43].eq(new HexVector(1,21))).toBeTruthy()
    
  })
}):
