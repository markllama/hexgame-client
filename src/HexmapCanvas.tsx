import * as React from 'react';
import { Layer, Stage, Text } from 'react-konva';

import ColoredHex from './ColoredHex';

class HexmapCanvas extends React.Component {
  public render() {
    return (
        <div className="HexmapCanvas">
        <Stage width={window.innerWidth} height={window.innerHeight} >
        <Layer>
        <Text text="Try click on rect" />
        <ColoredHex x={100} y={100}/>
        <ColoredHex x={200} y={200}/>
        </Layer>
        </Stage>
        </div>
    )
  }

}

export default HexmapCanvas; 