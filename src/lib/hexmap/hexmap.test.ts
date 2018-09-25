import * as chai from 'chai';

import { HexMap } from "./hexmap";

import { HexVector } from "./hexvector";

// import * as mocha from 'mocha';

const expect = chai.expect;

describe('HexMap Data Structure', () => {
  const hm0  = new HexMap(new HexVector(15, 22))
  expect(hm0.size.hx).to.equal(15)
});