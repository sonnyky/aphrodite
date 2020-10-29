import React from 'react';
import {IconButton} from '@material-ui/core';
import { SvgIcon } from '@material-ui/core';

export default function GalleryIcon(props) {
  return (
      <IconButton>
        <SvgIcon {...props}>
            <path d="M0.225586 2.75001H2.97559V7.62939e-06H0.225586V2.75001Z" fill="#262626"/>
            <path d="M4.35059 11H7.10059V8.25001H4.35059V11Z" fill="#262626"/>
            <path d="M2.97559 11H0.225586V8.25001H2.97559V11Z" fill="#262626"/>
            <path d="M0.225586 6.87501H2.97559V4.12501H0.225586V6.87501Z" fill="#262626"/>
            <path d="M7.10059 6.87501H4.35059V4.12501H7.10059V6.87501Z" fill="#262626"/>
            <path d="M8.47559 7.62939e-06V2.75001H11.2256V7.62939e-06H8.47559Z" fill="#262626"/>
            <path d="M7.10059 2.75001H4.35059V7.62939e-06H7.10059V2.75001Z" fill="#262626"/>
            <path d="M8.47559 6.87501H11.2256V4.12501H8.47559V6.87501Z" fill="#262626"/>
            <path d="M11.2256 11H8.47559V8.25001H11.2256V11Z" fill="#262626"/>
        </SvgIcon>
      </IconButton>
  );
}