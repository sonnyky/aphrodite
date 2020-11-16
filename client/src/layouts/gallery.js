import React, {Component} from 'react';
import GalleryHeader from './gallery_header';
import Fade from '@material-ui/core/Fade';

const Gallery = ({expandGallery}) => (
    <div style={{position:'fixed', top:'7vh', right:'0px', zIndex:'1', width:'45vw'}} id='gallery'>
        <Fade in={expandGallery}>
            <div>
                <GalleryHeader/>
            </div>
        </Fade>
  </div>
)

export default Gallery;