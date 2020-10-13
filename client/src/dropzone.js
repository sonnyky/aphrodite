import React from 'react';
import Dropzone from 'react-dropzone';
import './styles/dropzone.css'

const DropArea = ({onDropIn}) => {
  
  
    return (
        <Dropzone 
        onDrop={onDropIn}
        accept="image/*"
        minSize={1024}
        maxSize={3072000}
        >
        {({getRootProps, getInputProps, isDragActive}) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {isDragActive ? "Drop it like it's hot!" : 'Choose a file to check!'}
          </div>
        )}
      </Dropzone>
    )
  }

  export default DropArea