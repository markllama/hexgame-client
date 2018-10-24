//
// Test the HexVector object
//
import { JsonConvert } from 'json2typescript'
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

  it ("length", () => {
    expect(hexvector.ORIGIN.length).toBe(0)

    for (let i = 0 ; i++ ; i < hexvector.UNIT.length) {
      expect(hexvector[i].length).toBe(1)
    }

    const t = {"hv": new HexVector(0, 3), "len": 3}

    expect(t.hv.length).toBe(t.len)
    
    // const samples: {hv: HexVector, len: number}[] = [
    //   {hv: new HexVector(0, 3), len: 3},
    //   {hv: new HexVector(4, 3), len: 4},
    //   {hv: new HexVector(-3, 3), len: 6},
    //   {hv: new HexVector(2, -4), len: 3}
    // ]

    // for (var t in samples) {
    //   expect(t.hv.length).toEqual(3)
    // }
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


  it ("JSON", () => {

    const hvString = '{"hx": 3, "hy": 12}'
    const hvJson = JSON.parse(hvString)
    
    const jsonConvert: JsonConvert = new JsonConvert();
    const hv0: HexVector = jsonConvert.deserializeObject(hvJson, HexVector);
    expect(hv0).toBeTruthy()
    expect(hv0.hx).toEqual(3)
    expect(hv0.hy).toEqual(12)
    expect(hv0.hz).toEqual(9)
  });
});
