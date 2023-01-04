import React from 'react';
import { Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

export default function GradientText(props) {
  const {
    text, variant, gradientVariant, fontSize, fontWeight,
  } = props;

  const theme = useTheme();

  const colors = theme.palette.text.gradients[gradientVariant];

  return (
    <Typography
      variant={variant}
      fontFamily="'Montserrat', sans-serif"
      fontSize={fontSize}
      fontWeight={fontWeight}
      sx={{
        background: {
          xs: `linear-gradient(90deg, ${colors.start} 0%, ${colors.end} 55%)`,
          sm: `linear-gradient(90deg, ${colors.start} 0%, ${colors.end} 75%)`,
        },
        WebkitBackgroundClip: 'text!important',
        backgroundClip: 'text!important',
        WebkitTextFillColor: 'transparent!important',
        WebkitBoxDecorationBreak: 'clone',
        color: '#fff',
        display: 'table',
      }}
    >
      {text}
    </Typography>
  );
}

GradientText.defaultProps = {
  variant: 'h5',
  gradientVariant: 1,
  fontSize: null,
  fontWeight: 400,
};

GradientText.propTypes = {
  text: PropTypes.string.isRequired,
  gradientVariant: PropTypes.number,
  variant: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.number,
};
