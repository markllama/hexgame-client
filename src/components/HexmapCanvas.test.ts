// import HexmapCanvas from './HexmapCanvas';
import HexMap from '../lib/hexmap/map';
import HexVector from '../lib/hexmap/hexvector';

describe('HexmapCanvas', () => {

  const hm0 = new HexMap("sample", new HexVector(15,22))
  
  it("hexmap", () => {
    expect(hm0.name).toBe("sample")
    expect(hm0.size).toBeTruthy()
    expect(hm0.size.hx).toBe(15)
    expect(hm0.size.hy).toBe(22)
  });

//  const hmc0 = new HexmapCanvas(hm0);
//  it("constructor", () => {
//    expect(hmc0).toBeTruthy();
//    expect(hmc0.props.hexmap).toBeTruthy();
//  });
});