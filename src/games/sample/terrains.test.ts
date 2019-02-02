import Terrains from './terrains'

describe("sample terrains", () => {
  it("default", () => {

    expect(Object.keys(Terrains).length).toBe(2)
    Object.keys(Terrains).forEach(key => {
      expect(Terrains[key]).toBeTruthy()
    })

    expect(Terrains['hill']).toBeTruthy()
    
  })
})