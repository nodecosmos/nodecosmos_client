/* eslint-disable max-len */
import React from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { useInView } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setHomepageTab } from '../../homeSlice';

export default function OpenSourceLink() {
  const ref = React.createRef();

  const refInView = useInView(ref, { amount: 0.1, once: false });
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('sm'));
  const color = theme.palette.secondary.main;

  const viewBox = matchesXs ? '-55 277 218 178' : '-80 277 268 103';

  const dispatch = useDispatch();

  return (
    <Box
      component="svg"
      viewBox={viewBox}
      version="1.1"
      id="svg192"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      <Box component="g" id="layer1" transform="translate(-210.3086,-52.916667)">
        <g id="link-4">
          <g
            id="layer1-2-9-56"
            transform="matrix(-0.32616618,0,0,0.33320274,556.01334,281.06982)"
            style={{
              stroke: color,
              strokeWidth: '1.58645',
              strokeDasharray: 'none',
              strokeOpacity: 1,
            }}
          >
            <Box
              component="path"
              sx={{
                fill: 'none',
                fillOpacity: 1,
                stroke: color,
                strokeWidth: '2',
                strokeOpacity: 1,
                strokeDasharray: 1372.10715,
                strokeDashoffset: 1372.10715,
                animation: refInView ? 'dash-link 0.7s forwards' : 'dash-reverse-link 0.3s forwards',
              }}
              d="m 1054.9872,154.63801 v 42.44872 l -0.3515,25.96032 c -0.7242,14.35901 -18.0922,13.42702 -26.5269,13.57768 l -264.86864,0.77878 c -5.60316,0.19783 -19.60284,-1.30486 -22.24547,16.52173 l -1.04873,59.33768"
              id="path5853-3-2-2"
            />
          </g>
          <circle
            style={{
              r: refInView ? 1.5875 : 0,
              transition: `r 0.3s ${refInView ? '0s' : '0.3s'}`,
            }}
            fill={color}
            id="path109785-2-0-3-9"
            cx="211.89609"
            cy="332.31668"
          />
          <circle
            style={{
              r: refInView ? 1.5875 : 0,
              transition: `r 0.3s ${refInView ? '0.7s' : '0s'}`,
            }}
            fill={color}
            id="path109785-2-0-3-0-1"
            cx="314.62473"
            cy="384.70755"
          />
          <g style={{
            opacity: refInView ? 1 : 0,
            transition: `opacity ${refInView ? '0.7s' : '0.3s'} ${refInView ? '0.7s' : '0s'}`,
          }}
          >
            <foreignObject
              x={270}
              y={390}
              height={120}
              width={100}
            >
              <Typography
                fontFamily="'Comfortaa', sans-serif"
                fontSize={{
                  sm: 5,
                  xs: 8,
                }}
                color="text.sectionSecondary"
                fontWeight="bold"
              >
                By utilizing this concept, you are opening your innovation to a community that can assist you from the
                initial stages down to the finest details via
                {' '}
                <Box
                  component="span"
                  color="secondary.main"
                  borderBottom={1}
                  borderColor="secondary.main"
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => dispatch(setHomepageTab(1))}
                  target="_blank"
                >
                  Contribution Request
                </Box>
                {' '}
                features.
              </Typography>
            </foreignObject>
          </g>
        </g>
      </Box>
    </Box>
  );
}
