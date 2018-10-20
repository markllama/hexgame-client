import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Group, RegularPolygon, Text } from 'react-konva';

import Hex from '../lib/hexmap/hex';
import HexVector from '../lib/hexmap/hexvector';
// import Terrain from '../lib/hexmap/terrain';
import CanvasTerrain from './CanvasTerrain'

enum Orientation { Portrait = 'portrait', Landscape = 'landscape' }

interface ICanvasHexProps {
  hex: Hex,
  orientation: Orientation,
  pixel: HexVector,
  radius: number
}

class CanvasHex extends React.Component<ICanvasHexProps, any> {

  public static propTypes = {
    hex: PropTypes.object,
    orientation: PropTypes.string,
    pixel: PropTypes.object,
    radius: PropTypes.number
  }

  public static defaultProps = {
    orientation: Orientation.Portrait,
    radius: 30
  }
  
  public state = {
    color: 'green',
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

    const rotation = this.props.orientation === Orientation.Portrait ? 30 : 120
    
    return (
      <Group>
        <RegularPolygon
      x={p.hx}
      y={p.hy}
      sides={6}
      radius={r-3}
      rotation={rotation}
      stroke={'1px'}
      fill={this.state.color}
      // shadowBlur={5}
      onClick={this.handleClick}
        />
        {this.renderTerrains()}
        <Text x={p.hx} y={p.hy + (this.hexrise)} align="center" text={label} listening={false}/>
        </Group>
    );
  }

  private renderTerrains() {
    const t:JSX.Element[] = []
    this.terrains.forEach((terrain, dummy, set) => {
      t.push(<CanvasTerrain center={this.props.pixel} radius={this.props.radius} terrain={terrain} />)
      // t.push(<Ring x={p.hx} y={p.hy} innerRadius={20} outerRadius={30} stroke='black' fill='brown' />)
    })
    
    return t
  }

  private handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  }; 
}

export default CanvasHex; 