import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Group, RegularPolygon, Text } from 'react-konva';

import Hex from '../lib/hexmap/hex';
import HexVector from '../lib/hexmap/hexvector';
// import Terrain from '../lib/hexmap/terrain';

enum Orientation { Portrait = 'portrait', Landscape = 'landscape' }

interface ICanvasHexProps {
  hexrun: number,
  hex: Hex,
  orientation: Orientation,
  pixel: HexVector,
  radius: number
}

class CanvasHex extends React.Component<ICanvasHexProps, any> {

  public static propTypes = {
    hex: PropTypes.object,
    hexrun: PropTypes.number,
    orientation: PropTypes.string,
    pixel: PropTypes.object,
    radius: PropTypes.number
  }

  public static defaultProps = {
    hexrun: 15,
    orientation: Orientation.Portrait,
    radius: 30
  }
  
  public state = {
    color: 'green',
  };

  constructor(props: ICanvasHexProps) {
    super(props)
  }

  public get origin() {
    return new HexVector(
      this.props.hexrun * 2,
      this.props.hexrun * 4 * Math.sqrt(2/3)
    )
  }

  get hexrise() {
    return this.props.hexrun * 2 * Math.sqrt(2/3)
  }

  public get location() {
    return this.props.hex.location
  }

  public get terrains() {
    return this.props.hex.terrains
  }

  // 
  public render() {

    // calculate the pixel location for the hex
    const hexrise = this.hexrise
    // const p = this.center
    return (
      <Group>
        <RegularPolygon
      x={this.props.pixel.hx}
      y={this.props.pixel.hy}
      sides={6}
      radius={this.props.radius}
      rotation={30}
      stroke={'1px'}
      fill={this.state.color}
      // shadowBlur={5}
      onClick={this.handleClick}
        />
        <Text x={this.props.pixel.hx} y={this.props.pixel.hy + hexrise / 2} align="center" text={this.props.hex.location.toString()} listening={false}/>
        </Group>
    );
  }

  private handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  }; 
}

export default CanvasHex; 