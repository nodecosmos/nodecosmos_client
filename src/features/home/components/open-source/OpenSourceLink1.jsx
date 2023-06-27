/* eslint-disable max-len */
import React from 'react';
import {
  Typography, useMediaQuery, useTheme, Box,
} from '@mui/material';
import { useInView } from 'framer-motion';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function OpenSourceLink() {
  const ref = React.createRef();

  const refInView = useInView(ref, { amount: 0.1, once: false });
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('sm'));
  const color = theme.palette.secondary.main;

  const viewBox = matchesXs ? '-55 -5 218 125' : '-80 0 268 80';

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
        <g id="link-1">
          <g
            id="layer1-2"
            transform="matrix(0.33358984,0,0,0.33040762,-88.166176,4.4541324)"
            style={{
              stroke: color,
              strokeWidth: '2.11671099',
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
                strokeWidth: '2.11671099',
                strokeOpacity: 1,
                strokeDasharray: 911.7635190957031,
                strokeDashoffset: 911.7635190957031,
                animation: refInView ? 'dash-link-1 0.7s forwards' : 'dash-reverse-link-1 0.3s forwards',
              }}
              d="m 1056.5436,154.61765 v 42.45161 l -0.175,25.96209 c -0.3605,14.35997 -9.0063,13.42791 -13.2051,13.57859 l -131.85188,0.77883 c -4.91631,0.16357 -10.20116,1.44392 -10.40266,16.41007 l -1.19322,59.45451"
              id="path5853-3"
            />
          </g>
          <circle
            style={{
              r: refInView ? 1.5875 : 0,
              transition: `r 0.3s ${refInView ? '0s' : '0.3s'}`,
            }}
            fill={color}
            id="path109785-2-0-36"
            cx="264.25"
            cy="55"
          />
          <circle
            style={{
              r: refInView ? 1.5875 : 0,
              transition: `r 0.3s ${refInView ? '0.7s' : '0s'}`,
            }}
            fill={color}
            id="path109785-2-0"
            cx="211.93141"
            cy="106.92162"
          />
          <g style={{
            opacity: refInView ? 1 : 0,
            transition: `opacity ${refInView ? '0.7s' : '0.3s'} ${refInView ? '0.7s' : '0s'}`,
          }}
          >
            <foreignObject
              x="175"
              y={matchesXs && isSafari ? 117.5 : 112.5}
              height="100"
              width="100"
            >
              <Typography
                fontFamily="'Comfortaa', sans-serif"
                fontSize={{
                  sm: isSafari ? 4 : 5,
                  xs: isSafari ? 7 : 8,
                }}
                color="text.sectionSecondary"
                fontWeight="bold"
                ml={{
                  xs: 1,
                  sm: 0,
                }}
              >
                One of the most powerful concepts in software development is open source.
              </Typography>
            </foreignObject>
          </g>
        </g>
      </Box>
    </Box>
  );
}
