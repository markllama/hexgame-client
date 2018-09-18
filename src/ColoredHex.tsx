import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { RegularPolygon } from 'react-konva';

interface IColoredHexProps {
  radius: number,
  x: number,
  y: number
}

class ColoredHex extends React.Component<IColoredHexProps, any> {

  public static propTypes = {
    radius: PropTypes.number,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
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
      x={this.props.x}
      y={this.props.y}
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