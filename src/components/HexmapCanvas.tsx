import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Layer, Stage, Text } from 'react-konva';

import CanvasHex from './CanvasHex';

import Hex from '../lib/hexmap/hex';
import HexVector from '../lib/hexmap/hexvector';
import HexMap from '../lib/hexmap/map';
// import Terrain from '../lib/hexmap/terrain';
import "./HexmapCanvas.css";

enum Orientation { Portrait = "portrait", Landscape = "landscape" }

interface IHexmapCanvasProps {
  hexmap: HexMap,
  hexrun: number,
  orientation: Orientation,
  origin: HexVector,
}

class HexmapCanvas extends React.Component<IHexmapCanvasProps, any> {

  public static propTypes = {
    hexmap: PropTypes.object,
    hexrun: PropTypes.number,
    orientation: PropTypes.string,
    origin: HexVector,
  }

  public static defaultProps = {
    hexrun: 30,
    orientation: Orientation.Portrait,
    origin: new HexVector(),
  }

  // constructor(props) {
  //  super(props)
  // }

  public get size() { return this.props.hexmap.size; }
  public get hexrun() { return this.props.hexrun; }
  public get hexradius() { return this.hexrun * 2; }
  public get hexrise() { return Math.floor(this.hexradius * Math.sqrt(2/3)) + 4 }
  public get hexheight() { return Math.floor(this.hexrise * 2) }

  public get width() { return this.hexrun * (this.size.hx*3+1) }
  public get height() { return this.hexrise * (((this.size.hy)*2)+1)  }
  
  public render() {
    
    return (
        <div className="HexmapCanvas">
        <Stage width={this.width} height={this.height} >
        <Layer>
        <Text text={this.props.hexmap.name} />
        {this.fill_map()}
        </Layer>
        </Stage>
        </div>
    )

  }

  public get origin() {
    return new HexVector(
      this.hexrun * 2,
      this.hexrun * 4 * Math.sqrt(2/3)
    )
  }

  public hexToPixel(hv: HexVector):HexVector {

    const rowShift = new HexVector(0, (this.hexrise * 2))
    const colShift = new HexVector(this.hexrun * 3, 0)
    // const sawtooth = new HexVector()
    const sawtooth = (hv.hx % 2) === 0 ?
      new HexVector() :
      new HexVector(0, - this.hexrise)
    
    return this.origin
      .add(colShift.mul(hv.hx))
      .add(rowShift.mul(hv.hy - Math.floor(hv.hx / 2)))
      .add(sawtooth)
  }

  private yBias(x:number) { return Math.floor(x / 2) }

  
  private fill_map() {

    // const terrains = this.invert_terrains()
    
    const rows = []
    let col = 0
    let row = 0
    let location: HexVector;
    let pixel: HexVector;
    
    for (col = 0 ; col < this.props.hexmap.size.hx ; col++) {
      const bias = this.yBias(col);
      for (row = 0 ; row < this.props.hexmap.size.hy ; row++) {
        location = new HexVector(col, row + bias)
        pixel = this.hexToPixel(location)
        
        rows.push(<CanvasHex hex={new Hex(location=location)} pixel={pixel} radius={this.hexradius}/>);
      }
    }
    return rows
 }
}
export default HexmapCanvas;