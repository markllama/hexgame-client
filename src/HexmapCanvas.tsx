import * as React from 'react';
import { Layer, Stage, Text } from 'react-konva';

import ColoredRect from './ColoredRect';

class HexmapCanvas extends React.Component {
  public render() {
    return (
        <div className="HexmapCanvas">
        <Stage width={window.innerWidth} height={window.innerHeight} >
        <Layer>
        <Text text="Try click on rect" />
        <ColoredRect />
        </Layer>
        </Stage>
        </div>
    )
  }

}

export default HexmapCanvas; 