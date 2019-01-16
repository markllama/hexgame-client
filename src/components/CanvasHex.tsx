import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Group, RegularPolygon, Text } from 'react-konva';

import Hex from '../lib/hexmap/hex';
import HexVector from '../lib/hexmap/hexvector';


interface ICanvasHexProps {
  hex: Hex,
  pixel: HexVector,
  radius: number
}

class CanvasHex extends React.Component<ICanvasHexProps, any> {

  public static propTypes = {
    hex: PropTypes.object,
    pixel: PropTypes.object,
    radius: PropTypes.number
  }

  public static defaultProps = {
    radius: 30
  }
  
  public state = {
    color: 'lightgray',
  };

  constructor(props: ICanvasHexProps) {
    super(props)
  }

  get hexrise() {
    return this.props.radius * Math.sqrt(2/3) / 2
  }

  public get location() {
    return this.props.hex.location
  }

  public get terrains() {
    return this.props.hex.terrains
  }

  // 
  public render() {

    const p = this.props.pixel
    const r = this.props.radius
    const label = this.location.toString()

    return (
      <Group>
        <RegularPolygon
      x={p.hx}
      y={p.hy}
      sides={6}
      radius={r-3}
      rotation={30}
      stroke={'1px'}
      fill={this.state.color}
      listening={false}
      // shadowBlur={5}
        />
        <Text x={p.hx} y={p.hy + this.hexrise / 2} align="center" text={label} listening={false}/>
        </Group>
    );
  }
}

export default CanvasHex; 