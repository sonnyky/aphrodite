import React from 'react';
import Dropzone from 'react-dropzone';
import './styles/dropzone.css'

const DropArea = () => {
  
    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
    }
    return (
        <Dropzone onDrop={onDrop}>
        {({getRootProps, getInputProps, isDragActive}) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}
          </div>
        )}
      </Dropzone>
    )
  }

  export default DropArea