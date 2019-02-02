import Terrains from './terrains'

export const Game = {
  name: "tft",
  description: "The Fantasy Trip"
  defaultMap: "melee",
  maps: {
    'melee': "./meleeMap.json"
    'wizard': "./wizardMap.json"
  }
  terrains: Terrains
}

export default Game