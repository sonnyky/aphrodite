import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';


const Results = ({result, onResultModified}) => (

    <div className="col-lg-12 detection_result">
        <TextField
            label={result.identifier}
            helperText=''
            onChange={(e) => onResultModified(e, result.identifier)}
            value={result.value}/>
    </div>
)

export default Results;