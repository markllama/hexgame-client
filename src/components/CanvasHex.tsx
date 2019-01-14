import * as Konva from  'konva';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Group, RegularPolygon, Text } from 'react-konva';

import Hex from '../lib/hexmap/hex';
import HexVector from '../lib/hexmap/hexvector';
// import Terrain from '../lib/hexmap/terrain';
// import { Terrains } from './CanvasTerrain'
// import { Crater, Hill } from './CanvasTerrain'

// const Crater = Terrains.crater
// const Entry = Terrains.entry
// const Hill = Terrains.hill
// const MegahexCenter = Terrains.mhcenter
// const Pillar = Terrains.pillar

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
        <Text x={p.hx} y={p.hy + this.hexrise / 2} align="center" text={label} listening={false}/>
        </Group>
    );
  }

  //        {this.renderTerrains()}

  // private renderTerrains() {

  //   const t:JSX.Element[] = []
  //   this.terrains.forEach((terrain, dummy, set) => {
  //     switch (terrain.type) {
  //       case 'crater': {
  //         t.push(<Crater center={this.props.pixel} radius={this.props.radius} terrain={terrain} />)
  //         break;
  //       }
  //       case 'entry': {
  //         t.push(<Entry center={this.props.pixel} radius={this.props.radius} terrain={terrain} />)
  //         break;
  //       }
  //       case 'hill': {
  //         t.push(<Hill center={this.props.pixel} radius={this.props.radius} terrain={terrain} />)
  //         break;
  //       }
  //       case 'mhcenter': {
  //         t.push(<MegahexCenter center={this.props.pixel} radius={this.props.radius} terrain={terrain} />)
  //         break;
  //       }
        
  //       case 'pillar': {
  //         t.push(<Pillar center={this.props.pixel} radius={this.props.radius} terrain={terrain} />)
  //         break;
  //       }
  //     }
  //   })
    
  //   return t
  // }
 
  private handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };

 // private guid() {
 //   function s4() {
 //     return Math.floor((1 + Math.random()) * 0x10000)
 //       .toString(16)
 //       .substring(1);
 //   }
 //   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
 // }
}

export default CanvasHex; 