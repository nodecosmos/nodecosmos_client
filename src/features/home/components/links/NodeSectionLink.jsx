import { useTheme, Box } from '@mui/material';
import { useInView } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

export default function NodeSectionLink(props) {
    const { strokeWidth } = props;
    let { pathStroke, circleFill } = props;

    const ref = React.createRef();

    const refInView = useInView(ref, { amount: 0.5 });
    const theme = useTheme();

    pathStroke ||= theme.palette.tree.default;
    circleFill ||= theme.palette.tree.default;

    return (
        <svg
            width={835}
            height={130}
            version="1.1"
            id="svg5"
            xmlns="http://www.w3.org/2000/svg"
            ref={ref}
        >
            <defs id="defs2" />
            <g id="layer1">
                <path
                    style={{
                        fill: 'none',
                        fillOpacity: 1,
                        stroke: pathStroke,
                        strokeWidth,
                        strokeOpacity: 1,
                        strokeDasharray: 803.917,
                        strokeDashoffset: 803.917,
                        animation: refInView ? 'node-link 0.5s forwards' : 'node-link-reverse 0.3s forwards',
                    }}
                    d="m 417.5, 10
             v 15
             l -0.5,27
             c -0.9,15.12641 -15, 14.14461 -30.90792,14.30333
             l -242.0,0.0
             c -0.0,0.0 -26.84019,-1.37459 -25.91924,17.40476
             l -1.22194,32"
                    id="path5853"
                />
                <Box
                    component="path"
                    sx={{
                        fill: 'none',
                        fillOpacity: 1,
                        stroke: pathStroke,
                        strokeWidth,
                        strokeDasharray: 803.917,
                        strokeDashoffset: 803.917,
                        animation: refInView ? 'node-link 0.5s forwards' : 'node-link-reverse 0.3s forwards',
                    }}
                    d="m 417.5, 10
            v 15
            l 0.5,27
            c 0.9,15.12641 15, 14.14461 30.9079,14.30333
            l 242,0.0
            c 0,0.0 26.8402,-1.37459 25.9192,17.40476
            l 1.222,32"
                    id="path5853-2"
                />
                <Box
                    component="circle"
                    sx={{
                        fill: circleFill,
                        fillOpacity: 1,
                        stroke: 'none',
                        strokeWidth: 5,
                        strokeDasharray: 'none',
                        strokeOpacity: 1,
                        r: refInView ? 7.5 : 0,
                        transition: `r 0.3s ${refInView ? '0s' : '0.3s'}`,
                    }}
                    id="path8022"
                    cx="417.5"
                    cy="10"
                />
                <Box
                    component="circle"
                    sx={{
                        fill: circleFill,
                        fillOpacity: 1,
                        stroke: 'none',
                        strokeWidth: 5,
                        strokeDasharray: 'none',
                        strokeOpacity: 1,
                        r: refInView ? 7.5 : 0,
                        transition: `r 0.3s ${refInView ? '0.4s' : '0s'}`,
                    }}
                    id="path8022-6"
                    cx="117"
                    cy="120"
                />
                <Box
                    component="circle"
                    sx={{
                        fill: circleFill,
                        fillOpacity: 1,
                        stroke: 'none',
                        strokeWidth: 5,
                        strokeDasharray: 'none',
                        strokeOpacity: 1,
                        r: refInView ? 7.5 : 0,
                        transition: `r 0.3s ${refInView ? '0.4s' : '0s'}`,
                    }}
                    id="path8022-6-1"
                    cx="718"
                    cy="120"
                />
            </g>
        </svg>
    );
}

NodeSectionLink.defaultProps = {
    circleFill: null,
    pathStroke: null,
    strokeWidth: 3,
};

NodeSectionLink.propTypes = {
    circleFill: PropTypes.string,
    pathStroke: PropTypes.string,
    strokeWidth: PropTypes.number,
};
