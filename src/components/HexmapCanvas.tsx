import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Group, Layer, Stage, Text } from 'react-konva';


import Hex from '@hexmap/hex';
import { HexVector, ORIGIN } from '@hexmap/hexvector';
import HexMap from '@hexmap/map';
// import Terrain from '../lib/hexmap/terrain';

import { JsonConvert } from 'json2typescript'

import "./HexmapCanvas.css";

import CanvasHex from './CanvasHex';
import { Terrains } from './CanvasTerrain'

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
  public get hexrise() { return Math.floor(this.hexradius * Math.sqrt(2/3)) }
  public get hexheight() { return Math.floor(this.hexrise * 2) }

  public get size() {
    if (!this.state.hexmap) { return ORIGIN }
    const borders = this.state.hexmap.borders()
    return borders.high.sub(borders.low)
  }

  public get offset() {
    if (!this.state.hexmap) { return ORIGIN }
    return this.state.hexmap.borders().low
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

    let origin = this.state.hexmap.pixelOrigin(this.hexrun)
    let width = this.width
    let height = this.height
    let rotate = 0

    if (this.props.orientation === Orientation.Landscape) {
      width = this.height
      height = this.width
      rotate = -90
      origin = new HexVector(origin.hy, this.width - origin.hx)
    }

    rotate += this.state.hexmap.rotation
    
    return (
        <div className="HexmapCanvas">
        <h1>Hello There</h1>
        <h2>{this.state.hexmap.name}: ({this.state.hexmap.shape}/{this.state.hexmap.shapeName()})</h2>
        <Stage width={width} height={height} >
        <Layer id="hex-layer">
        <Text text={this.state.hexmap.name} />
        <Group x={origin.hx} y={origin.hy} rotation={rotate}>
        {this.draw_hexes()}
        </Group>
        </Layer>
        <Layer id="terrain-layer" >
        <Group x={origin.hx} y={origin.hy} rotation={rotate}>
        {this.draw_terrains()}
        </Group>
        </Layer>
        <Layer id="token-layer">
        <Group x={origin.hx} y={origin.hy} rotation={rotate} />
        </Layer>
        </Stage>
        </div>
    )
  }

  //
  // Place the (0, 0) hex so the entire map fits
  //

  public hexToPixel(hv: HexVector):HexVector {
    const rowShift = new HexVector(0, (this.hexrise * 2))
    const colShift = new HexVector(this.hexrun * 3, 0)
    // const sawtooth = ORIGIN
    const sawtooth = (hv.hx % 2) === 0 ?
      ORIGIN :
      new HexVector(0, - this.hexrise)

    return ORIGIN
      .add(colShift.mul(hv.hx))
      .add(rowShift.mul(hv.hy - Math.floor(hv.hx / 2)))
      .add(sawtooth)
  }

  // 
  private draw_hexes() {

    // const terrains = this.invert_terrains()
    
    const hexes = new Array<JSX.Element>()
    let pixel: HexVector;
    const offset = this.state.hexmap ? this.state.hexmap.borders().low : ORIGIN

    if (this.state.hexmap) {
      this.state.hexmap.all().forEach( (location: HexVector) => {
        pixel = this.hexToPixel(location.sub(offset))
        hexes.push(<CanvasHex hex={new Hex(location=location)} pixel={pixel} radius={this.hexradius}/>);
      })
    }
    return hexes
  }

  private draw_terrains() {

    const offset = this.state.hexmap ? this.state.hexmap.borders().low : ORIGIN
    const terrains = new Array<JSX.Element>()
    // let pixel: HexVector;

    if (this.state.hexmap) {
      this.state.hexmap.terrains.forEach((terrain) => {
        terrain.locations.forEach((hv: HexVector) => {
          const pixel = this.hexToPixel(hv.sub(offset))
          switch (terrain.type) {
            
          case "crater": {
            terrains.push(<Terrains.crater center={pixel} radius={this.hexradius} terrain={terrain} />);
            break;
          }

          case "entry": {
            terrains.push(<Terrains.entry center={pixel} radius={this.hexradius} terrain={terrain} />);
            break;
          }

          case "hill": {
            terrains.push(<Terrains.hill center={pixel} radius={this.hexradius} terrain={terrain} />);
            break;
          }

          case "hole": {
            terrains.push(<Terrains.hole center={pixel} radius={this.hexradius} terrain={terrain} />);
            break;
          }

          case "mhcenter": {
            terrains.push(<Terrains.mhcenter center={pixel} radius={this.hexradius} terrain={terrain} />);
            break;
          }

          case "pillar": {
            terrains.push(<Terrains.pillar center={pixel} radius={this.hexradius} terrain={terrain} />);
            break;
          }

          }
        })
      })
    }

    return terrains
  }

  private getMap() {
    const response = fetch(this.props.hexmapurl)
    response.then( resp => {
      return resp.json()
    }).then( hmJson => {
      const jsonConvert: JsonConvert = new JsonConvert();
      const hm = jsonConvert.deserializeObject(hmJson, HexMap)
      hm.initShape()
      this.setState( {'hexmap': hm } )
    })
  }

}
export default HexmapCanvas;