import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Group, RegularPolygon, Text } from 'react-konva';

import Hex from '../lib/hexmap/hex';
import HexVector from '../lib/hexmap/hexvector';

interface ICanvasHexProps {
  hexrun: number,
  hex: Hex
}

class CanvasHex extends React.Component<ICanvasHexProps, any> {

  public static propTypes = {
    hex: PropTypes.object,
    hexrun: PropTypes.number
  }

  public static defaultProps = {
    hexrun: 15
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

  // pixel location of the hex on the canvas
  public get center() {
    const hexrise = this.hexrise
    const rowShift = new HexVector(0, hexrise * 2)
    const colShift = new HexVector(this.props.hexrun * 3, 0)
    // const sawtooth = new HexVector()
    const sawtooth = (this.props.hex.hx % 2) === 0 ?
      new HexVector() :
      new HexVector(0, - hexrise)
    
    return this.origin
      .add(colShift.mul(this.props.hex.hx))
      .add(rowShift.mul(this.props.hex.hy - Math.floor(this.props.hex.hx / 2)))
      .add(sawtooth)
  }

  public get location() {
    return this.props.hex.location
  }

  // 
  public render() {

    // calculate the pixel location for the hex
    const hexrise = this.hexrise
    const p = this.center
    return (
      <Group>
        <RegularPolygon
      x={p.hx}
      y={p.hy}
      sides={6}
      radius={this.props.hexrun * 2}
      rotation={30}
      stroke={'1px'}
      fill={this.state.color}
      // shadowBlur={5}
      onClick={this.handleClick}
        />
        <Text x={p.hx} y={p.hy + hexrise / 2} align="center" text={this.props.hex.location.toString()} listening={false}/>
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