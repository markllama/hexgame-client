import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Layer, Stage, Text } from 'react-konva';

import ColoredHex from './ColoredHex';

import HexVector from '../lib/hexmap/hexvector';

interface IHexmapCanvasProps {
  hexrun: number,
  origin: HexVector
}

class HexmapCanvas extends React.Component<IHexmapCanvasProps, any> {

  public static propTypes = {
    hexrun: PropTypes.number,
    origin: HexVector
  }

  public static defaultProps = {
    hexrun: 15,
    origin: new HexVector()
  }

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

//  private yBias(x:number) {
//    Math.floor(x / 2)
//  }

  private fill_map() {

    const hexradius = this.props.hexrun * 2;
    const hexrise = Math.floor(hexradius * Math.sqrt(2/3));
    const hexheight = Math.floor(hexrise * 2);
    const origin = new HexVector(hexradius + 10, hexheight);
    // const rowShift = new HexVector(0, -hexheight)
    const colShift = new HexVector(this.props.hexrun * 3, 0)
    
    const rows = []
    let col = 0
    let row = 0
    let location: HexVector;

    for (col = 0 ; col < 7 ; col++) {
      for (row = 0 ; row < 10 ; row++) {
        location = origin.add(colShift.mul(col)).add(new HexVector(0, (row * hexheight) - (col * hexrise)))
        // .add(yBias)
        rows.push(<ColoredHex radius={hexradius} origin={location}/>);
      }
    }
    return rows
 }
}
export default HexmapCanvas;