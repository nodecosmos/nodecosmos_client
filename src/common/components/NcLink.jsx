import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NcLink({
  title, maxWidth, to, onClick,
}) {
  return (
    <Typography
      onClick={onClick}
      component={to ? Link : 'span'}
      to={to}
      variant="body1"
      color="text.secondary"
      textAlign="left"
      fontWeight={500}
      sx={{
        maxWidth,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
        '&:hover': {
          cursor: 'pointer',
          textDecoration: 'underline',
          color: 'text.link',
        },
      }}
    >
      {title}

    </Typography>
  );
}

NcLink.defaultProps = {
  onClick: null,
  to: null,
  maxWidth: '100%',
};

NcLink.propTypes = {
  title: PropTypes.string.isRequired,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  to: PropTypes.string,
  onClick: PropTypes.func,
};
