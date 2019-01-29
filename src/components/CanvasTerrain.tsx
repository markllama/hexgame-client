// import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Group } from 'react-konva';

import HexVector from '@hexmap/hexvector';
import Terrain from '@hexmap/terrain';

import Crater from './terrain/crater'
import Entry from './terrain/entry'
import Hill from './terrain/hill'
import Hole from './terrain/hole'
import MegahexCenter from './terrain/mhcenter'
import Pillar from './terrain/pillar'

export const Terrains = {
  crater: Crater,
  entry: Entry,
  hill: Hill,
  hole: Hole,
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