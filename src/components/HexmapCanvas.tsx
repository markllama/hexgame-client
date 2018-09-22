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
    const hexheight = Math.floor(this.props.hexrun * 1.6);
    const origin = new HexVector(hexradius, hexheight * 3);
    const shift = new HexVector(hexradius, 0)
    
    const rows = []
    let i = 0
    for (i = 0 ; i < 6 ; i++) {
      const location = origin.add(shift.mul(i*3))
      rows.push(<ColoredHex radius={hexradius} origin={location}/>);
    }
    return rows
 }
}
export default HexmapCanvas;