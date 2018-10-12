import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Layer, Stage, Text } from 'react-konva';

import CanvasHex from './CanvasHex';

import Hex from '../lib/hexmap/hex';
import HexVector from '../lib/hexmap/hexvector';
import HexMap from '../lib/hexmap/map';
import Terrain from '../lib/hexmap/terrain';
import "./HexmapCanvas.css";

interface IHexmapCanvasProps {
  hexmap: HexMap,
  hexrun: number,
  origin: HexVector,
}

class HexmapCanvas extends React.Component<IHexmapCanvasProps, any> {

  public static propTypes = {
    hexmap: PropTypes.object,
    hexrun: PropTypes.number,
    origin: HexVector,
  }

  public static defaultProps = {
    hexrun: 30,
    origin: new HexVector(),
  }

  constructor(props) {
    super(props)
  }
  public get size() { return this.props.hexmap.size; }
  public get hexrun() { return this.props.hexrun; }
  public get hexradius() { return this.hexrun * 2; }
  public get hexrise() { return Math.floor(this.hexradius * Math.sqrt(2/3)) }
  public get hexheight() { return Math.floor(this.hexrise * 2) }

  public render() {
    
    return (
        <div className="HexmapCanvas">
        <Stage width={this.hexrun * (this.size.hx*3+1)} height={this.hexrise * ((this.size.hy + 1)*2)} >
        <Layer>
        <Text text={this.props.hexmap.name} />
        {this.fill_map()}
        </Layer>
        </Stage>
        </div>
    )

  }

  
  private yBias(x:number) { return Math.floor(x / 2) }

  private fill_map() {

    // const terrains = this.invert_terrains()
    
    const rows = []
    let col = 0
    let row = 0
    let location: HexVector;

    for (col = 0 ; col < this.props.hexmap.size.hx ; col++) {
      const bias = this.yBias(col);
      for (row = 0 ; row < this.props.hexmap.size.hy ; row++) {
        location = new HexVector(col, row + bias)
        // let hexterrains = (terrains.has(location) ? terrains.get(location) : new Array<Terrain>())
        
        // check if this hex has terrains
        
        rows.push(<CanvasHex hexrun={this.hexrun} hex={new Hex(location=location)}/>);
      }
    }
    return rows
 }
}
export default HexmapCanvas;