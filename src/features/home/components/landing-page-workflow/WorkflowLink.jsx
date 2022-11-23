import PropTypes from 'prop-types';
import React from 'react';

export default function WorkflowLink(props) {
  const { x, y } = props;

  return (
    <g />
  );
}

WorkflowLink.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};
