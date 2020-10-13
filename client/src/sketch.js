import React from 'react';
import 'flexboxgrid';
import {SketchField, Tools} from 'react-sketch';
import DropArea from './dropzone';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import color from '@material-ui/core/colors/blueGrey';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import Card from '@material-ui/core/Card';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


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
        margin: '10px 10px 5px 0'
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
        }

    }
    onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
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
                console.log(image.width);
                console.log(image.height);

                var oc = document.createElement('canvas'),
                octx = oc.getContext('2d');

                oc.width = 488;
                oc.height = 652;
                octx.drawImage(image, 0, 0, oc.width, oc.height);
                sketch.setBackgroundFromDataUrl(oc.toDataURL("image/jpeg"), {
                  stretched: stretched,
                  stretchedX: stretchedX,
                  stretchedY: stretchedY,
                  originX: originX,
                  originY: originY,
                });
                
              }, false);
            },
            false,
          );
          reader.readAsDataURL(accepted[0]);
        }
      };

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
        return (
            <MuiThemeProvider theme={theme}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <AppBar title="Sketch Tool" position="static" style={styles.appBar}>
                    <Toolbar>
                      <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>Sketch Tool</Typography>
                      <IconButton
                        color="primary"
                        disabled={!this.state.canUndo}
                        onClick={this._undo}>
                        <UndoIcon/>
                      </IconButton>
                      <IconButton
                        color="primary"
                        disabled={!this.state.canRedo}
                        onClick={this._redo}>
                        <RedoIcon/>
                      </IconButton>
                      <IconButton
                        onClick={this._save}>
                        <SaveIcon/>
                      </IconButton>
                      <IconButton
                        onClick={this._download}>
                        <DownloadIcon/>
                      </IconButton>
                      <IconButton
                        onClick={this._clear}>
                        <DeleteIcon/>
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-7 col-sm-7 col-md-9 col-lg-9">
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
                          lineWidth={3}/>
                </div>


                <div className="col-xs-5 col-sm-5 col-md-3 col-lg-3">
                  <Card style={styles.card}>
                    <CardHeader
                      title="Tools"
                      subheader="Available tools"
                      action={
                        <IconButton
                          onClick={(e) => this.setState({ expandTools: !this.state.expandTools })}>
                          <ExpandMore/>
                        </IconButton>
                      }/>
                    <Collapse in={this.state.expandTools}>
                      <CardContent>
                        <div className="row">
                          <div className="col-lg-12">
                            <TextField
                              select={true}
                              label="Canvas Tool"
                              value={this.state.tool}
                              onChange={this._selectTool}
                              helperText="Please select Canvas Tool">
                              <MenuItem value={Tools.Select} key="Select">Select</MenuItem>
                              <MenuItem value={Tools.Pencil} key="Pencil">Pencil</MenuItem>
                              <MenuItem value={Tools.Line} key="Line">Line</MenuItem>
                              <MenuItem value={Tools.Arrow} key="Arrow">Arrow</MenuItem>
                              <MenuItem value={Tools.Rectangle} key="Rectangle">Rectangle</MenuItem>
                              <MenuItem value={Tools.Circle} key="Circle">Circle</MenuItem>
                              <MenuItem value={Tools.Pan} key="Pan">Pan</MenuItem>
                              <MenuItem value={Tools.RectangleLabel} key="Pan">RectangleLabel</MenuItem>
                            </TextField>
                          </div>
                        </div>
                      </CardContent>
                    </Collapse>
                  </Card>
                </div>
              </div>

              <div>
                <DropArea onDropIn={this._onBackgroundImageDrop} />
              </div>
                  
            </MuiThemeProvider>        
        )
     }
}
export default SketchArea