import React from 'react';
import Fade from '@material-ui/core/Fade';
import {ReactComponent as GalleryIconList} from '../images/gallery_icon_list.svg';
import FileEntry from './file_entry'


const FileGallery = ({expandGallery, loadedFiles}) => (
    <div style={{position:'fixed', top:'7vh', right:'0px', zIndex:'1', width:'45vw'}} id='gallery'>
        <Fade in={expandGallery}>
            <div id='contents' style={{background:'#262626', color:'#F2F2F2', textAlign:'left', padding:'3vw'}}>
                <div id='header' style={{marginBottom:'2vh'}}>
                    <GalleryIconList /> Gallery
                </div>
                <div>
                    {loadedFiles.map((file, i) => {
                        return <FileEntry key={i} file={file}/>
                    })}
                </div>
            </div>
        </Fade>
    </div>
)



export default FileGallery;