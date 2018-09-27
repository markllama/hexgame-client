import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Layer, Stage, Text } from 'react-konva';

import ColoredHex from './ColoredHex';

import HexVector from '../lib/hexmap/hexvector';

import "./HexmapCanvas.css";

interface IHexmapCanvasProps {
  size: HexVector
  origin: HexVector,
  hexrun: number,
}

class HexmapCanvas extends React.Component<IHexmapCanvasProps, any> {

  public static propTypes = {
    hexrun: PropTypes.number,
    origin: HexVector,
    size: HexVector
  }

  public static defaultProps = {
    hexrun: 15,
    origin: new HexVector(),
    size: new HexVector(15, 21),
  }

  public get hexradius() { return this.props.hexrun * 2; }
  public get hexrise() { return Math.floor(this.hexradius * Math.sqrt(2/3)) }
  public get hexheight() { return Math.floor(this.hexrise * 2) }

  public render() {
    
    return (
        <div className="HexmapCanvas">
        <Stage width={window.innerWidth} height={window.innerHeight} >
        <Layer>
        <Text text="Try click on rect" />
        {this.fill_map()}
        </Layer>
        </Stage>
        </div>
    )

  }

  private yBias(x:number) { return Math.floor(x / 2) }

  private fill_map() {

    const origin = new HexVector(this.hexradius + 10, this.hexheight);
    // const rowShift = new HexVector(0, -hexheight)
    const colShift = new HexVector(this.props.hexrun * 3, 0)
    
    const rows = []
    let col = 0
    let row = 0
    let location: HexVector;

    for (col = 0 ; col < this.props.size.hx ; col++) {
      const bias = this.yBias(col);
      for (row = 0 ; row < this.props.size.hy ; row++) {
        location = origin.add(colShift.mul(col)).add(new HexVector(0, ((row + bias) * this.hexheight) - (col * this.hexrise)))
        // .add(yBias)
        rows.push(<ColoredHex radius={this.hexradius} origin={location}/>);
      }
    }
    return rows
 }
}
export default HexmapCanvas;