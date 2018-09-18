import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { RegularPolygon } from 'react-konva';

interface IColoredHexProps {
  x: number,
  y: number
}

class ColoredHex extends React.Component<IColoredHexProps, any> {

  public static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
  }

  public static defaultProps = {
    x: 40,
    y: 40
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
      radius={30}
      rotation={30}
      fill={this.state.color}
      shadowBlur={5}
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