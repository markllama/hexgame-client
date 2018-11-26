import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Layer, Stage, Text } from 'react-konva';

import CanvasHex from './CanvasHex';

import { JsonConvert } from 'json2typescript'
import Hex from '../lib/hexmap/hex';
import HexVector from '../lib/hexmap/hexvector';
import HexMap from '../lib/hexmap/map';
import Terrain from '../lib/hexmap/terrain';
import "./HexmapCanvas.css";

import * as HttpRequest from '../lib/request';

export enum Orientation { Portrait = "portrait", Landscape = "landscape" }

interface IHexmapCanvasProps {
  hexmapurl: string,
  hexrun: number,
  orientation: Orientation,
  origin: HexVector,
}

interface IHexmapCanvasState {
  hexmap: HexMap
}

export class HexmapCanvas extends React.Component<IHexmapCanvasProps, IHexmapCanvasState> {

  public static propTypes = {
    hexmapurl: PropTypes.string,
    hexrun: PropTypes.number,
    orientation: PropTypes.string,
    origin: HexVector,
  }

  public static defaultProps = {
    hexmapurl: "./sampleMap.json",
    hexrun: 30,
    orientation: Orientation.Portrait,
    origin: new HexVector(),
  }

  constructor(props:IHexmapCanvasProps) {
    super(props)

    // query the map from the hexmapurl
    this.getMap()
  }

  public get size() { return this.state.hexmap.size; }
  public get hexrun() { return this.props.hexrun; }
  public get hexradius() { return this.hexrun * 2; }
  public get hexrise() { return Math.floor(this.hexradius * Math.sqrt(2/3)) + 4 }
  public get hexheight() { return Math.floor(this.hexrise * 2) }

  public get width() { return this.hexrun * (this.size.hx*3+1) }
  public get height() { return this.hexrise * (((this.size.hy)*2)+1)  }


  // start methods to get map from server

  public render() {

    if (this.state === null || this.state.hexmap === null) {
      return (
          <div className="HexMapCanvas">
          <p>
          <h1>Hello There</h1>
          </p>
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
    
    let point:HexVector = new HexVector()
    
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
        // const sawtooth = new HexVector()
        const sawtooth = (hv.hx % 2) === 0 ?
          new HexVector() :
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
        // const sawtooth = new HexVector()
        const sawtooth = (hv.hx % 2) === 0 ?
          new HexVector() :
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

  private yBias(x:number) { return Math.floor(x / 2) }

  private fill_map() {

    // const terrains = this.invert_terrains()
    
    const rows = []
    let col = 0
    let row = 0
    let location: HexVector;
    let terrains: Set<Terrain>;
    let pixel: HexVector;
    
    for (col = 0 ; col < this.state.hexmap.size.hx ; col++) {
      const bias = this.yBias(col);
      for (row = 0 ; row < this.state.hexmap.size.hy ; row++) {
        location = new HexVector(col, row + bias)

        // look up the terrain canvas object, create them and pass them into
        // the CanvasHex
        terrains = this.state.hexmap.terrainsAt(location)


        pixel = this.hexToPixel(location)
        
        rows.push(<CanvasHex orientation={this.props.orientation} hex={new Hex(location=location, terrains=terrains)} pixel={pixel} radius={this.hexradius}/>);
//        rows.push(<CanvasHex orientation={this.props.orientation} hex={new Hex(location=location)} pixel={pixel} radius={this.hexradius}/>);
      }
    }
    return rows
  }

  private getMap() {
    const response = HttpRequest.request('get', this.props.hexmapurl)
    response.then( resp => {
      const jsonConvert: JsonConvert = new JsonConvert();
      const hm = jsonConvert.deserialize(resp.json(), HexMap)
      this.setState( { 'hexmap': hm } )
    })
  }

}
export default HexmapCanvas;