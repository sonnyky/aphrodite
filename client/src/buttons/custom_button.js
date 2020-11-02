import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: 'white',
    borderRadius: 3,
    border: 0,
    color: 'black',
    height: '4vh',
    width: '8vw',
    fontSize: '0.4em',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

function ClassNames(props) {
  const { classes, children, className, onClickCallback, ...other } = props;
  return (
    <Button onClick={onClickCallback} className={classes.root} {...other}>
      {children || 'class names'}
    </Button>
  );
}

ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onClickCallback: PropTypes.func
};

export default withStyles(styles)(ClassNames);
