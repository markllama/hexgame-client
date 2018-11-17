import { JsonConvert } from 'json2typescript'
import HexMap from "./lib/hexmap/map";

export function loadMap(mapurl: string = ""):HexMap {

  const hmJson = require('./samplemap.json')
  // const hmObject = JSON.parse(hmJson)
  const jsonConvert: JsonConvert = new JsonConvert();
  const hm = jsonConvert.deserialize(hmJson, HexMap)
    
  return hm
}

export default loadMap;