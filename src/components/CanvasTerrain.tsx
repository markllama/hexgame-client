// import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Group, Ring } from 'react-konva';

import HexVector from '../lib/hexmap/hexvector';
import Terrain from '../lib/hexmap/terrain';

interface ICanvasTerrain {
  center: HexVector,
  radius: number,
  terrain: Terrain
  
}

class CanvasTerrain extends React.Component<ICanvasTerrain, any> {
  public static propTypes = {
    center: PropTypes.object,
    radius: PropTypes.number,
    terrain: PropTypes.object
  }

  public render() {
    return (
      <Group>
        <Ring x={this.props.center.hx} y={this.props.center.hy} innerRadius={this.props.radius / 2} outerRadius={this.props.radius * .75} stroke='black' fill='brown' listening={false} />
      </Group>
    );
  }
}

export default CanvasTerrain;