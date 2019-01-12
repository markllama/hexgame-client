// import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Group } from 'react-konva';

import HexVector from '../lib/hexmap/hexvector';
import Terrain from '../lib/hexmap/terrain';

import Crater from './terrain/crater'
import Hill from './terrain/hill'
import MegahexCenter from './terrain/mhcenter'
import Pillar from './terrain/pillar'

export const Terrains = {
  crater: Crater,
  hill: Hill,
  mhcenter: MegahexCenter,
  pillar: Pillar
}

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
    return ( <Group /> );
  }
}

export default CanvasTerrain;