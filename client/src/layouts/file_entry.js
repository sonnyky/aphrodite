import React from 'react';

const FileEntry = ({file}) => (
    <div style={{marginBottom:'2vh', color:'#E0E0E0'}}>
        {console.log(file)}
        {file.fileName}
    </div>
)

export default FileEntry;