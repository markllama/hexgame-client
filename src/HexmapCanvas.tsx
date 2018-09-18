import * as React from 'react';
import { Layer, Stage, Text } from 'react-konva';

import ColoredHex from './ColoredHex';

class HexmapCanvas extends React.Component {

  
  
  public render() {
    const radius = 30;
    const hexheight = Math.floor(radius * 0.8)
    const X0 = radius
    const Y0 = hexheight * 2
    return (
        <div className="HexmapCanvas">
        <Stage width={window.innerWidth} height={window.innerHeight} >
        <Layer>
        <Text text="Try click on rect" />
        <ColoredHex radius={radius} x={X0} y={Y0}/>
        <ColoredHex radius={radius} x={X0 + radius * 3} y={Y0}/>
        <ColoredHex radius={radius} x={X0 + radius * 1.5} y={Y0 + hexheight}/>
        </Layer>
        </Stage>
        </div>
    )
  }

}

export default HexmapCanvas; 