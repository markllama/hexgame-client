import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Layer, Stage, Text } from 'react-konva';

import ColoredHex from './ColoredHex';

interface IHexmapCanvasProps {
  hexradius: number,
  originx: number,
  originy: number
}

class HexmapCanvas extends React.Component<IHexmapCanvasProps, any> {

  public static propTypes = {
    hexradius: PropTypes.number,
    originx: PropTypes.number,
    originy: PropTypes.number
  }

  public static defaultProps = {
    hexradius: 30,
    originx: 30,
    originy: 45
  }

  public render() {
    const hexheight = Math.floor(this.props.hexradius * 0.8)
    const X0 = this.props.hexradius + 3
    const Y0 = hexheight * 3
    return (
        <div className="HexmapCanvas">
        <Stage width={window.innerWidth} height={window.innerHeight} >
        <Layer>
        <Text text="Try click on rect" />
        <ColoredHex radius={this.props.hexradius} x={X0} y={Y0}/>
        <ColoredHex radius={this.props.hexradius} x={X0 + this.props.hexradius * 3} y={Y0}/>
        <ColoredHex radius={this.props.hexradius} x={X0 + this.props.hexradius * 1.5} y={Y0 - hexheight}/>
        </Layer>
        </Stage>
        </div>
    )
  }

}

export default HexmapCanvas; 