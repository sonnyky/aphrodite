import React from 'react';

import {SketchField, Tools} from 'react-sketch';
import DropArea from './dropzone'

const styles = {
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
        return (
            <div>
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
                <div>
                    <DropArea onDropIn={this._onBackgroundImageDrop} />
                  </div>
            </div>        
        )
     }
}
export default SketchArea