import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Layer, Stage, Text } from 'react-konva';

import CanvasHex from './CanvasHex';

import { JsonConvert } from 'json2typescript'
import Hex from '../lib/hexmap/hex';
import { HexVector, ORIGIN } from '../lib/hexmap/hexvector';
import HexMap from '../lib/hexmap/map';
import Terrain from '../lib/hexmap/terrain';
import "./HexmapCanvas.css";

export enum Orientation { Portrait = "portrait", Landscape = "landscape" }

interface IHexmapCanvasProps {
  hexmapurl: string,
  hexrun: number,
  orientation: Orientation,
  origin: HexVector,
}

interface IHexmapCanvasState {
  hexmap: HexMap | null,
}

export class HexmapCanvas extends React.Component<IHexmapCanvasProps, IHexmapCanvasState> {

  public static propTypes = {
    hexmapurl: PropTypes.string,
    hexrun: PropTypes.number,
    orientation: PropTypes.string,
    origin: PropTypes.object,
  }

  public static defaultProps = {
    hexmapurl: "./sampleMap.json",
    hexrun: 30,
    orientation: Orientation.Portrait,
    origin: ORIGIN,
  }

  constructor(props:IHexmapCanvasProps) {
    super(props)

    this.state = {'hexmap': null}
    // query the map from the hexmapurl
    this.getMap()
  }

  public get hexrun() { return this.props.hexrun; }
  public get hexradius() { return this.hexrun * 2; }
  public get hexrise() { return Math.floor(this.hexradius * Math.sqrt(2/3))+4 }
  public get hexheight() { return Math.floor(this.hexrise * 2) }

  public get size() {
    if (!this.state.hexmap) { return ORIGIN }
    const borders = this.state.hexmap.borders()
    return borders.high.sub(borders.low)
  }
  
  public get width() { return this.hexrun * (this.size.hx*3+1) }
  public get height() { return this.hexrise * (((this.size.hy)*2)+1)  }


  // start methods to get map from server

  public render() {

    if (this.state === null || this.state.hexmap === null) {
      return (
          <div className="HexMapCanvas">
          <h1>Waiting: No map has been loaded</h1>
          </div>
      )
    }

    let width = this.width
    let height = this.height

    if (this.props.orientation === Orientation.Landscape) {
      width = this.height
      height = this.width
    }
    
    return (
        <div className="HexmapCanvas">
        <h1>Hello There</h1>
        <h2>{this.state.hexmap.name}: ({this.state.hexmap.shape}/{this.state.hexmap.shapeName()})</h2>
        <Stage width={width} height={height} >
        <Layer>
        <Text text={this.state.hexmap.name} />
        {this.fill_map()}
        </Layer>
        </Stage>
        </div>
    )
  }

  public get origin() {
    
    let point:HexVector = ORIGIN
    
    switch(this.props.orientation) {
      case Orientation.Portrait: {
        point = new HexVector(
          this.hexrun * 2,
          this.hexrun * 4 * Math.sqrt(2/3)
        )
        break;
      }
      case Orientation.Landscape: {
        point = new HexVector(
          5 + this.hexrun * 4 * Math.sqrt(2/3),
          this.width - this.hexrun * 2
        )
        break;      
      }
    }

    return point
  }

  public hexToPixel(hv: HexVector):HexVector {

    let point:HexVector = this.origin
    
    switch(this.props.orientation) {
      case Orientation.Portrait: {
        const rowShift = new HexVector(0, (this.hexrise * 2))
        const colShift = new HexVector(this.hexrun * 3, 0)
        // const sawtooth = ORIGIN
        const sawtooth = (hv.hx % 2) === 0 ?
          ORIGIN :
          new HexVector(0, - this.hexrise)
        point = point
          .add(colShift.mul(hv.hx))
          .add(rowShift.mul(hv.hy - Math.floor(hv.hx / 2)))
          .add(sawtooth)
        break;
      }

      case Orientation.Landscape: {
        const rowShift = new HexVector((this.hexrise * 2), 0)
        const colShift = new HexVector(0, - this.hexrun * 3)
        // const sawtooth = ORIGIN
        const sawtooth = (hv.hx % 2) === 0 ?
          ORIGIN :
          new HexVector(- this.hexrise, 0)
        point = point
          .add(colShift.mul(hv.hx))
          .add(rowShift.mul(hv.hy - Math.floor(hv.hx / 2)))
          .add(sawtooth)
        break;
      }
      
    }

    return point
  }

  private fill_map() {

    // const terrains = this.invert_terrains()
    
    const hexes = new Array<JSX.Element>()
    let terrains: Set<Terrain>;
    let pixel: HexVector;

    if (this.state.hexmap) {
      this.state.hexmap.all().forEach( (location: HexVector) => {
        if (this.state.hexmap) {
          terrains = this.state.hexmap.terrainsAt(location)
          pixel = this.hexToPixel(location)
          hexes.push(<CanvasHex orientation={this.props.orientation} hex={new Hex(location=location, terrains=terrains)} pixel={pixel} radius={this.hexradius}/>);}
        
      })
    }
    return hexes
  }

  private getMap() {
    const response = fetch(this.props.hexmapurl)
    response.then( resp => {
      return resp.json()
    }).then( hmJson => {
      const jsonConvert: JsonConvert = new JsonConvert();
      const hm = jsonConvert.deserialize(hmJson, HexMap)
      hm.initShape()
      this.setState( {'hexmap': hm } )
    })
  }

}
export default HexmapCanvas;