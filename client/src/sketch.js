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
          reader.addEventListener(
            'load',
            (entry) =>{
              const image = new Image();
              sketch.setBackgroundFromDataUrl(reader.result, {
                stretched: stretched,
                stretchedX: stretchedX,
                stretchedY: stretchedY,
                originX: originX,
                originY: originY,
              });
              image.src = entry.target.result;
              image.onload = function() {
                
                // We have the image widht and height here, so resize canvas to fit the image
                console.log(this.width);
                console.log(this.height);
        
              };
            },
            false,
          );
          reader.readAsDataURL(accepted[0]);
        }
      };

     render() {
        return (
            <div>
                <SketchField 
                        name="sketch"
                        className="canvas-area"
                        ref={c => (this._sketch = c)}
                        width='1024px' 
                        height='768px' 
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