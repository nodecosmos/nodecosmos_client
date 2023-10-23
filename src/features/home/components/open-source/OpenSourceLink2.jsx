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

    const viewBox = matchesXs ? '-55 92 218 120' : '-80 90 268 85';

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
                <g id="link-2">
                    <g
                        id="layer1-2-9"
                        transform="matrix(-0.32616619,0,0,0.33320421,556.01333,95.861241)"
                        style={{
                            stroke: color,
                            strokeWidth: '1.58645',
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
                            id="path5853-3-2"
                        />
                    </g>
                    <circle
                        style={{
                            r: refInView ? 1.5875 : 0,
                            transition: `r 0.3s ${refInView ? '0s' : '0.3s'}`,
                        }}
                        fill={color}
                        id="path109785-2-0-3"
                        cx="211.89609"
                        cy="147.10834"
                    />
                    <circle
                        style={{
                            r: refInView ? 1.5875 : 0,
                            transition: `r 0.3s ${refInView ? '0.7s' : '0s'}`,
                        }}
                        fill={color}
                        id="path109785-2-0-3-0"
                        cx="314.62473"
                        cy="199.49916"
                    />
                    <g style={{
                        opacity: refInView ? 1 : 0,
                        transition: `opacity ${refInView ? '0.7s' : '0.3s'} ${refInView ? '0.7s' : '0s'}`,
                    }}
                    >
                        <foreignObject
                            height={100}
                            width={100}
                            x={270}
                            y={matchesXs && isSafari ? 210 : 204}
                        >
                            <Typography
                                fontFamily="'Comfortaa', sans-serif"
                                fontSize={{
                                    sm: isSafari ? 4 : 5,
                                    xs: isSafari ? 7 : 8,
                                }}
                                ml={{
                                    xs: 0,
                                    sm: 0,
                                }}
                                color="text.sectionSecondary"
                                fontWeight="bold"
                            >
                It enables engineers and companies to openly collaborate on solutions that can benefit anyone.
                            </Typography>
                        </foreignObject>
                    </g>
                </g>
            </Box>
        </Box>
    );
}
