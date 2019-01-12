 // import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Group, Line, Ring } from 'react-konva';

import HexVector from '../../lib/hexmap/hexvector';
import Terrain from '../../lib/hexmap/terrain';

interface IMegahexCenter {
  center: HexVector,
  radius: number,
  terrain: Terrain
  
}

class MegahexCenter extends React.Component<IMegahexCenter, any> {
  public static propTypes = {
    center: PropTypes.object,
    radius: PropTypes.number,
    terrain: PropTypes.object
  }

  public border(): HexVector[] {
    const hexradius = this.props.radius
    const hexrise = hexradius * Math.sqrt(2/3)
    
    return [
      new HexVector(-hexradius/2, -hexrise*3),
      new HexVector(hexradius/2, -hexrise*3),

      new HexVector(hexradius/2, hexrise*3),
      new HexVector(-hexradius/2, hexrise*3)
    ]
  }
  
  public render() {

    const mhborder = this.border().map(h => this.props.center.add(h) )
    const mhpoints = [].concat.apply([],mhborder.map(h => h.toArray()))
    
    return (
      <Group>
        <Ring x={this.props.center.hx} y={this.props.center.hy} innerRadius={this.props.radius / 2} outerRadius={this.props.radius * .75} stroke='black' fill='gray' listening={false} />

        <Line closed={true} points={mhpoints} stroke='black' listening={false} />
      </Group>
    );
  }

}

export default MegahexCenter;