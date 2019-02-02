import Game from './game'

describe("Sample Game", () => {
  it("imports", () {
    expect(Object.keys(Game.terrains).length).toBe(2)
  }
})