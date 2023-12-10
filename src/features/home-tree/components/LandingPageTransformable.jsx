import usePannable from '../hooks/usePannable';
import {
    useMediaQuery, useTheme, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
// import useZoomable from '../../hooks/useZoomable';
const isFirefox = typeof InstallTrigger !== 'undefined';

export default function LandingPageTransformable(props) {
    const { children } = props;
    const gRef = useRef(null);
    const svgRef = useRef(null);
    const theme = useTheme();

    const matchesSm = useMediaQuery(theme.breakpoints.down('lg'));
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    let scale;
    if (matchesXs) {
        scale = 0.75;
    } else if (matchesSm) {
        scale = 0.75;
    } else {
        scale = 1;
    }

    const containerHeight = 825 * scale;

    const minHeight = matchesSm ? 825 : 825;
    const minWidth = 1050;

    const resize = useCallback(() => {
        const newHeight = gRef.current.getBBox().height + 50;
        const newWidth = gRef.current.getBBox().width + 50;

        svgRef.current.setAttribute('height', newHeight > minHeight ? newHeight : minHeight);
        svgRef.current.setAttribute('width', newWidth > minWidth ? newWidth : minWidth);
    }, [minHeight, minWidth]);

    // handle pan
    const {
        pan,
        handleMouseDown,
    } = usePannable(gRef);

    // handle zoom
    // const {
    //   zoom, handleWheel, enableScroll, handleTouchStart: handlePinch,
    // } = useZoomable(gRef, scale, setPan, pan);

    // window.addEventListener('keyup', enableScroll);

    const transition = isFirefox ? 'none' : 'transform 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms';

    return (
        <Box
            onClick={resize}
            onMouseDown={handleMouseDown}
            onTouchStart={resize}
            overflow={{
                xs: 'auto',
                md: 'hidden',
            }}
        >
            {/* <TransformablePath panX={pan.x} /> */}
            <Box
                // onTouchStart={handlePinch}
                sx={{
                    p: 0,
                    WebkitTapHighlightColor: 'transparent',
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    KhtmlUserSelect: 'none',
                    MozUserSelect: 'none',
                    MsUserSelect: 'none',
                    userSelect: 'none',
                    transformOrigin: 'top left',
                    height: containerHeight,
                }}
                style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                    transition,
                }}
            >
                <svg
                    ref={svgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    width={minWidth}
                    height={minHeight}
                    style={{
                        marginLeft: -35,
                        marginTop: -10,
                    }}
                >
                    <g ref={gRef}>
                        {children}
                    </g>
                </svg>
            </Box>
        </Box>
    );
}

LandingPageTransformable.propTypes = { children: PropTypes.element.isRequired };
