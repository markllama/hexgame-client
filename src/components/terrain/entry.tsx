// import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Arc, Group } from 'react-konva';

import HexVector from '../../lib/hexmap/hexvector';
import Terrain from '../../lib/hexmap/terrain';

interface IEntry {
  center: HexVector,
  radius: number,
  terrain: Terrain
  
}

class Entry extends React.Component<IEntry, any> {
  public static propTypes = {
    center: PropTypes.object,
    radius: PropTypes.number,
    terrain: PropTypes.object
  }

  public render() {
    return (
      <Group>
        <Arc x={this.props.center.hx} y={this.props.center.hy + this.props.radius / 3} angle={120} rotation={210} innerRadius={this.props.radius / 2} outerRadius={this.props.radius * .75} stroke='black' fill='brown' listening={false} />
      </Group>
    );
  }

}

export default Entry;