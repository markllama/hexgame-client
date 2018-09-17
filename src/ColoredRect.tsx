import * as Konva from  'konva';
import * as React from 'react';
import { Rect } from 'react-konva';

class ColoredRect extends React.Component {
  public state = {
    color: 'green'
  };
    
  public render() {
    return (
        <Rect
      x={20}
      y={20}
      width={50}
      height={50}
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

export default ColoredRect; 