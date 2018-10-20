// import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Arc, Group, Ring } from 'react-konva';

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

    let terrainElement:JSX.Element

    if (this.props.terrain.type === 'crater') {
      terrainElement = this.crater()
    } else if (this.props.terrain.type === 'hill') {
      terrainElement = this.hill()
    } else {
      terrainElement = <Group />
    }
    
    return (
      <Group>
        {terrainElement}
      </Group>
    );
  }

  private crater() {
    return (
        <Ring x={this.props.center.hx} y={this.props.center.hy} innerRadius={this.props.radius / 2} outerRadius={this.props.radius * .75} stroke='black' fill='gray' listening={false} />
    )
  }

  private hill() {
    return (
        <Arc x={this.props.center.hx} y={this.props.center.hy + this.props.radius / 3} angle={120} rotationDeg={210} innerRadius={this.props.radius / 2} outerRadius={this.props.radius * .75} stroke='black' fill='brown' listening={false} />
    )
  }
}

export default CanvasTerrain;