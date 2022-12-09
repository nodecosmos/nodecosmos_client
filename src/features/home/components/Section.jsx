import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';

export default function Section(props) {
  const { padding } = props;

  return (
    <Card
      elevation={2}
      sx={{
        borderTop: '1px solid #3c4149', // 3c4149 414145,
        height: '100%',
        backgroundColor: props.backgroundColor,
        borderRadius: 2,
        padding,
      }}
    >
      {props.children}
    </Card>
  );
}

Section.defaultProps = {
  backgroundColor: '#31353c', // #32353b
  padding: {
    xs: 3,
    sm: 4,
  },
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  padding: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
};
