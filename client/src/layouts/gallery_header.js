import React, {Component} from 'react';
import {ReactComponent as GalleryIconList} from '../images/gallery_icon_list.svg';

const GalleryHeader = () => (

    <div id='gallery_header' style={{background:'#262626', color:'white'}}>
        <GalleryIconList/> Gallery
    </div>
)

export default GalleryHeader;