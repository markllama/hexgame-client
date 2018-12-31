//
// Each map has a shape. The shape and the size determine the boundaries and
// contents of each map
//
import HexVector from "./hexvector"

// export function yBias(hx:number):number { return Math.floor(hx / 2) }

export interface IMapShape {
  name: string;
  size: HexVector;
  contains(hv: HexVector): boolean;
  all(): HexVector[];
}

export default IMapShape;