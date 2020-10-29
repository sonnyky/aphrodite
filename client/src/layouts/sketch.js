import React from 'react';
import 'flexboxgrid';
import {SketchField, Tools} from 'react-sketch';
import DropArea from '../dropzone';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import color from '@material-ui/core/colors/blueGrey';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Card from '@material-ui/core/Card';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import '../styles/main.css'
import '../styles/icon.css'
import Results from '../layouts/results';
import {ArrowRight, ArrowLeft} from 'react-bootstrap-icons';
import {Button} from 'react-bootstrap';

import RectangleIcon from '../icons/rectangle_icon';
import OverviewIcon from '../icons/overview_icon';
import {ReactComponent as CompanyLogo} from '../images/logo.svg';
import PreviousButton from '../buttons/custom_button';
import NextButton from '../buttons/custom_button';
import GalleryButton from '../buttons/custom_button';
import {ReactComponent as GalleryIcon} from '../images/gallery.svg';
import ClassNames from '../buttons/custom_button';

const fabric = require('fabric').fabric;
const styles = {
  root: {
    padding: '3px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px 10px 5px 10px',
    justifyContent: 'space-around',
  },
  dropArea: {
      width: '100%',
      height: '10%',
      border: '2px dashed rgb(102, 102, 102)',
      borderStyle: 'dashed',
      borderRadius: '5px',
      textAlign: 'center',
      paddingTop: '20px',
    },
    activeStyle: {
      borderStyle: 'solid',
      backgroundColor: '#eee',
    },
    rejectStyle: {
      borderStyle: 'solid',
      backgroundColor: '#ffdddd',
    },
    card: {
      margin: '5px '
    },
    revised: {
      color: 'red'
    },
    appBar: {
      backgroundColor: '#262626'
    },
    headerButton: {
      color: 'red',
      fill: 'red'
    },
    logo:{
      marginRight: "20vw"
    },
    saveButton: {
      background: '#3182CE',
    }
}

class SketchArea extends React.Component {
    constructor(props){
        super(props);

        this.state={
            sketchWidth: 600,
            sketchHeight: 600,
            // controlledSize tells the canvas object to use the canvas size and width from user input
            // If false it will use browser width
            controlledSize: true,
            stretched: true,
            stretchedX: false,
            stretchedY: false,
            originX: 'left',
            originY: 'top',
            canUndo: false,
            canRedo: false,
            text: 'Cimamon',
            // To modify dinamically the canvas element according to image size
            canvasRect: {},
            results: [{identifier: 'company_name', value: ''}, {identifier: 'company_address', value: ''}]
        }

    }
    canvasRef = node => node && this.setState({canvasRect: node.getBoundingClientRect()});
    _addText = (text, topMargin, leftMargin) => {
      
      let canvas = this._sketch._fc;
      let options = {left: leftMargin, top: topMargin};
      console.log(canvas);
      let iText = new fabric.IText(text, options);
      iText.set({
        'left': options.left,
        'top': options.top,
        'fontSize': 14,
        'backgroundColor': 'rgb(200,200,200)',
        'fill': 'rgb(255,0,0)'
      });

      canvas.add(iText);
    }
    _onBackgroundImageDrop = (accepted /*, rejected*/) => {
        if (accepted && accepted.length > 0) {
         
          let sketch = this._sketch;
          let reader = new FileReader();
          let { stretched, stretchedX, stretchedY, originX, originY } = this.state;
          console.log(sketch);
          reader.addEventListener(
            'load',
            (entry) =>{
              const image = new Image();
              image.src = entry.target.result;
              image.addEventListener('load', ()=>{
                
                console.log("canvas");
                console.log(JSON.stringify(this.state.canvasRect));
                
                var oc = document.createElement('canvas'),
                octx = oc.getContext('2d');

                oc.width = image.width;
                oc.height = image.height;
                var resizedWidth = this.state.canvasRect.width;
                var resizedHeight = (image.height/image.width) * this.state.canvasRect.width;
                
                oc.width = resizedWidth;
                oc.height = resizedHeight;
                
                octx.drawImage(image, 0, 0, oc.width, oc.height);
                sketch.setBackgroundFromDataUrl(oc.toDataURL("image/jpeg"), {
                  stretched: false,
                  stretchedX: false,
                  stretchedY: false,
                  originX: originX,
                  originY: originY,
                });
                this.setState({
                  results: [{identifier: 'company_name', value: '朝日工業'}, {identifier: 'company_address', value: '埼玉県児玉郡神川町渡瀬２２２'}],
                  sketchWidth: resizedWidth,
                  sketchHeight: resizedHeight
                })
              }, false);
            },
            false,
          );
          reader.readAsDataURL(accepted[0]);
        }
      };

      onResultModified = (e, label) => {
        for(var index in this.state.results){
          if(this.state.results[index].identifier == label){
            var temp = this.state.results;
            temp[index].value = e.target.value;
              this.setState({
                results: temp
              })
          }
        }
      }

      onBoundingBox = () => {

        if(this._sketch._history.current == null) return;

        console.log(this._sketch._history.current);
        var topText = this._sketch._history.current[0].top - 20;
        var leftText = this._sketch._history.current[0].left;

        this._addText(this.state.results[0].value, topText, leftText);
      }

     render = () => {
      const theme = createMuiTheme({
        typography: {
          useNextVariants: true,
        },
        palette: {
          primary: { main: color[500] }, // Purple and green play nicely together.
          secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
        },
      });

      const results = this.state.results;
        return (
            <MuiThemeProvider theme={theme}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <AppBar title="Document Validator" position="static" style={styles.appBar}>
                    <Toolbar>
                      <CompanyLogo style={styles.logo}/>
                      <OverviewIcon/>
                      <RectangleIcon />
                      <div style={{marginLeft: '7vw'}}>
                        <PreviousButton style={{background: 'white'}} children={<div><ArrowLeft/> Prev</div>}/>
                        <NextButton style={{background: 'white'}} children={<div>Next <ArrowRight/></div>}/>
                      </div>
                      <div style={{marginLeft: '7vw'}}>
                        <GalleryButton style={{background: 'white'}} children={<div><GalleryIcon/> Open Gallery</div>}/>
                      </div>
                      <ClassNames id="save_button">Save</ClassNames>
                    </Toolbar>
                  </AppBar>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-7 col-sm-7 col-md-8 col-lg-auto"
                  ref = {this.canvasRef}
                >
                  <SketchField 
                          name="sketch"
                          className="canvas-area"
                          ref={c => (this._sketch = c)}
                          width={
                            this.state.controlledSize ? this.state.sketchWidth : null
                          }
                          height={
                            this.state.controlledSize ? this.state.sketchHeight : null
                          }
                          tool={Tools.Rectangle} 
                          lineColor='black'
                          lineWidth={2}
                          onChange={this.onBoundingBox}

                          />
                </div>

                <div className="col-xs-5 col-sm-5 col-md-4 col-lg-4">
                  <Card style={styles.card}>
                    <CardHeader
                      title="Extracted Information"
                      subheader="**********"
                      />

                    <CardContent>
                        <div className="row">
                          {results.map((result, i) => {
                              return <Results key={i} result={result} onResultModified={this.onResultModified}/>
                          })}
                        </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              
              <div className="col-xs-4 col-sm-4 col-md-auto col-lg-auto" >
                <DropArea onDropIn={this._onBackgroundImageDrop} />
              </div>
                
                  
            </MuiThemeProvider>        
        )
     }
}
export default SketchArea