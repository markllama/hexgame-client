
import * as chai from 'chai';
import { HexVector } from './hexvector'
// import * as mocha from 'mocha';

const expect = chai.expect;

describe('HexMap Data Structure', () => {
  const hv0 = new HexVector(15, 22)
  expect(hv0.hx).to.equal(15)
});