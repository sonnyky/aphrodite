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

    _onBackgroundImageDrop = (accepted /*, rejected*/) => {
        if (accepted && accepted.length > 0) {
          let sketch = this._sketch;
          let reader = new FileReader();
          let { stretched, stretchedX, stretchedY, originX, originY } = this.state;
          reader.addEventListener(
            'load',
            () =>
              sketch.setBackgroundFromDataUrl(reader.result, {
                stretched: stretched,
                stretchedX: stretchedX,
                stretchedY: stretchedY,
                originX: originX,
                originY: originY,
              }),
            false,
          );
          reader.readAsDataURL(accepted[0]);
        }
      };

     render() {
        return (
            <div>
                <SketchField width='1024px' 
                         height='768px' 
                         tool={Tools.Rectangle} 
                         lineColor='black'
                         lineWidth={3}/>
                <div>
                    <DropArea />
                  </div>
            </div>        
        )
     }
}
export default SketchArea