import React from 'react';
import { SvgIcon } from '@material-ui/core';

function RectangleIcon(props) {

  return(
    <SvgIcon {...props}>
      <path d="M0 5.5C0 2.73858 2.23858 0.5 5 0.5H16.4286C19.19 0.5 21.4286 2.73858 21.4286 5.5V9.51099C21.4286 12.2724 19.19 14.511 16.4286 14.511H5C2.23857 14.511 0 12.2724 0 9.51099V5.5Z" fill="#999999"/>
    </SvgIcon>
  )
}

export default RectangleIcon;