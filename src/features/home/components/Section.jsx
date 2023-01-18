import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';

export default function Section(props) {
  const { padding, borderRadius } = props;

  return (
    <Card
      elevation={2}
      sx={{
        borderTop: 1,
        borderColor: 'borders.sectionTop',
        height: '100%',
        borderRadius,
        padding,
        overflow: 'initial',
      }}
    >
      {props.children}
    </Card>
  );
}

Section.defaultProps = {
  padding: {
    xs: 3,
    sm: 4,
  },
  borderRadius: {
    xs: 2,
    sm: 3,
    md: 4,
  },
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
  borderRadius: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
};
