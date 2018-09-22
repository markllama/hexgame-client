import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { RegularPolygon } from 'react-konva';

import HexVector from '../lib/hexmap/hexvector';

interface IColoredHexProps {
  radius: number,
  origin: HexVector
}

class ColoredHex extends React.Component<IColoredHexProps, any> {

  public static propTypes = {
    origin: HexVector,
    radius: PropTypes.number
  }

  public static defaultProps = {
    radius: 15
  }
  
  public state = {
    color: 'green',
  };

  constructor(props: IColoredHexProps) {
    super(props)
  }
  
  // 
  public render() {
    return (
        <RegularPolygon
      x={this.props.origin.hx}
      y={this.props.origin.hy}
      sides={6}
      radius={this.props.radius}
      rotation={30}
      stroke={'1px'}
      fill={this.state.color}
      // shadowBlur={5}
      onClick={this.handleClick}
        />
    );
  }

  private handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  }; 
}

export default ColoredHex; 