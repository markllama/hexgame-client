//
// Test the HexVector object
//
import HexVector from './hexvector';
import * as hexvector from './hexvector';

describe('<HexVector>', () => {
  it ("default", () => {
    const hv0 = new HexVector()

    expect(hv0.hx).toEqual(0)
    expect(hv0.hy).toEqual(0)
  });
  
  it ("ORIGIN", () => {
    expect(hexvector.ORIGIN.hx).toEqual(0)
    expect(hexvector.ORIGIN.hy).toEqual(0)
  });

  it ("UNIT", () => {
    expect(hexvector.UNIT.length).toEqual(7)
    
    expect(hexvector.UNIT[0].hx).toEqual(0)
    expect(hexvector.UNIT[0].hy).toEqual(-1)
  });

  it ("eq()", () => {
    expect(hexvector.ORIGIN.eq(new HexVector(0, 0))).toBeTruthy()
    expect(hexvector.ORIGIN.eq(new HexVector(0, 1))).toBeFalsy()
    expect(hexvector.ORIGIN.eq(new HexVector(1, 0))).toBeFalsy()
  });

  it ("add()", () => {
    const hv0 = new HexVector(3, 5)
    const hv1 = new HexVector(8, -3)
    const result = new HexVector(11, 2)
    expect(hv0.add(hv1).eq(result)).toBeTruthy()
  });

  it ("sub()", () => {
    const hv0 = new HexVector(3, 5)
    const hv1 = new HexVector(8, -3)
    const result = new HexVector(-5, 8)
    expect(hv0.sub(hv1).eq(result)).toBeTruthy()
  });
  
  it ("mul()", () => {
    const hv0 = new HexVector(-3, 5)
    const result = new HexVector(-9, 15)
    expect(hv0.mul(3).eq(result)).toBeTruthy()
  });

  
});

