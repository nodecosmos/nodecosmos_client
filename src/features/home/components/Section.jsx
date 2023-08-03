import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';

export default function Section({
  padding, borderRadius, overflow, children,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: 'borders.1',
        height: '100%',
        borderRadius,
        padding,
        boxShadow: '2',
        overflow,
      }}
    >
      {children}
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
  overflow: 'initial',
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
  borderRadius: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
  overflow: PropTypes.string,
};
