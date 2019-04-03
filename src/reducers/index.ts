// import { Reducer } from "redux";

const initMaps = {
  'empty': {
    "game": "no game",
    "name": "empty map",
    "shape": "sawtooth",
    "size": {"hx": 15, "hy": 22},
    "terrains": {}
  }
}

function maps(state:object = initMaps, action: any) {
  return state
}

export default maps;