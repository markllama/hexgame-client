import Terrains from './terrains'

export const Game = {
  defaultMap: "melee",
  description: "The Fantasy Trip"
  maps: {
    'melee': "./meleeMap.json"
    'wizard': "./wizardMap.json"
  }
  name: "tft",
  terrains: Terrains
}

export default Game