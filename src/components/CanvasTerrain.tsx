// import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Group, Text } from 'react-konva';

import HexVector from '../lib/hexmap/hexvector';
import Terrain from '../lib/hexmap/terrain';

interface ICanvasTerrain {
  locations: HexVector[],
  terrain: Terrain
}

class CanvasTerrain extends React.Component<ICanvasTerrain, any> {
  public static propTypes = {
    locations: PropTypes.array,
    terrain: PropTypes.object
  }

  public render() {
    return (
      <Group>
        <Text text="Heythere" listening={false} />
      </Group>
    );
  }
}

export default CanvasTerrain;