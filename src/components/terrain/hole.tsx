 // import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Circle, Group } from 'react-konva';

import HexVector from '../../lib/hexmap/hexvector';
import Terrain from '../../lib/hexmap/terrain';

interface IHole {
  center: HexVector,
  radius: number,
  terrain: Terrain
  
}

class Hole extends React.Component<IHole, any> {
  public static propTypes = {
    center: PropTypes.object,
    radius: PropTypes.number,
    terrain: PropTypes.object
  }

  public render() {

    return (
      <Group>
        <Circle x={this.props.center.hx} y={this.props.center.hy} radius={this.props.radius * 0.75 } stroke='black' fill='saddlebrown' listening={false} />
      </Group>
    );
  }

}

export default Hole;