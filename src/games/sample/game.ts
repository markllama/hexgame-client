import Terrains from './terrains'

export const Game = {
  name: "sample",
  description: "A sample game and maps",
  defaultMap: "sample",
  maps: {
    'sample': "./sampleMap.json"
  }
  terrains: Terrains
}

export default Game