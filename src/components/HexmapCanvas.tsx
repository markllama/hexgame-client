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
  
  private fill_map() {

    const hexradius = this.props.hexrun * 2;
    const hexrise = Math.floor(hexradius * Math.sqrt(2/3));
    const hexheight = Math.floor(hexrise * 2);
    const origin = new HexVector(hexradius, hexheight * 3);
    const colShift = new HexVector(0, hexheight)
    const rowShift = new HexVector(this.props.hexrun * 3, 0)
    
    const rows = []
    let i = 0
    let j = 0
    let location: HexVector;
    for (i = 0 ; i < 15 ; i++) {
      for (j = 0 ; j < 21 ; j++) {
        location = origin.add(rowShift.mul(i)).add(colShift.mul(j))
        if ((i % 2) === 1) {
          location = location.add(new HexVector(0,hexrise))
        }
        rows.push(<ColoredHex radius={hexradius} origin={location}/>);
      }
    }
    return rows
 }
}
export default HexmapCanvas;