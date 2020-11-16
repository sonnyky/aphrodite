import React from 'react';
import {IconButton} from '@material-ui/core';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { SvgIcon } from '@material-ui/core';
import '../styles/icon.css'

const useStyles = makeStyles(theme => ({
  iconButtonLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function OverviewIcon(props) {
  const classes = useStyles();
  const {onClickCallback} = props;
  return (
      <IconButton onClick={onClickCallback} classes={{label: classes.iconButtonLabel}}>
        <SvgIcon>
            <path d="M7.8486 13.6167L1.70693 8.84167L0.356934 9.89167L7.85693 15.725L15.3569 9.89167L13.9986 8.83333L7.8486 13.6167Z" fill="#999999"/>
            <path d="M7.85693 12.1667L13.9903 7.39167L15.3569 6.33333L7.85693 0.5L0.356934 6.33333L1.71527 7.39167L7.85693 12.1667Z" fill="#999999"/>        </SvgIcon>
        <div className="icon_label">
          Overview
        </div>
      </IconButton>
  );
}

OverviewIcon.propTypes = {
  onClickCallback: PropTypes.func
};

export default OverviewIcon;
