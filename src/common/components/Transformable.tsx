import { selectTransformablePositionsById } from '../../features/app/app.selectors';
import { setTransformablePositions } from '../../features/app/appSlice';
import {
    TRANSFORMABLE_HEIGHT_MARGIN, TRANSFORMABLE_ID, TRANSFORMABLE_MIN_WIDTH, TRANSFORMABLE_WIDTH_MARGIN,
} from '../../features/app/constants';
import usePannable from '../hooks/usePannable';
import { Box } from '@mui/material';
import React, {
    useCallback,
    useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface TransformableProps {
    children: React.ReactNode;
    transformableId: string;
    scale?: number;
    heightMargin?: number;
}

export default function Transformable(props: TransformableProps) {
    const {
        children, transformableId, scale = 1, heightMargin = TRANSFORMABLE_HEIGHT_MARGIN,
    } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const gRef = useRef<SVGSVGElement>(null);
    const dispatch = useDispatch();
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });
    const position = useSelector(selectTransformablePositionsById(transformableId));
    const { scrollTop } = useMemo(() => position ?? {}, [position]);

    useEffect(() => {
        const handleResize = () => {
            const svgHeight = (gRef.current?.getBBox().height || 0) + heightMargin;
            const clientHeight = containerRef.current?.clientHeight || 0;
            const height = Math.max(svgHeight, clientHeight - 8);

            const newWidth = (gRef.current?.getBBox().width || 0) + TRANSFORMABLE_WIDTH_MARGIN;
            const width = newWidth > TRANSFORMABLE_MIN_WIDTH ? newWidth : TRANSFORMABLE_MIN_WIDTH;

            if (height !== dimensions.height || width !== dimensions.width) {
                setDimensions({
                    height,
                    width,
                });
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        const gEl = gRef.current;

        if (gEl) {
            resizeObserver.observe(gEl);
        }

        return () => {
            if (resizeObserver && gEl) {
                resizeObserver.unobserve(gEl);
            }
        };
    }, [dimensions, heightMargin]);

    //------------------------------------------------------------------------------------------------
    const { onMouseDown } = usePannable(containerRef);

    //------------------------------------------------------------------------------------------------
    const handleScroll = useCallback((() => {
        requestAnimationFrame(() => {
            if (!containerRef.current) return;

            dispatch(setTransformablePositions({
                id: transformableId,
                clientHeight: containerRef.current.clientHeight,
                clientWidth: containerRef.current.clientWidth,
                scrollTop: containerRef.current.scrollTop,
                scrollLeft: containerRef.current.scrollLeft,
            }));
        });
    }), [dispatch, transformableId]);

    useEffect(() => {
        if (containerRef.current) {
            dispatch(setTransformablePositions({
                id: transformableId,
                clientHeight: containerRef.current.clientHeight,
                clientWidth: containerRef.current.clientWidth,
                scrollTop: containerRef.current.scrollTop,
                scrollLeft: containerRef.current.scrollLeft,
            }));
        }
    }, [dispatch, transformableId]);

    // used by breadcrumbs
    useEffect(() => {
        if (containerRef.current) { containerRef.current.scrollTop = Number(scrollTop); }
    }, [scrollTop]);

    const resizeTimeout = useRef<number | null>(null);
    const clientHeight = containerRef.current?.clientHeight;

    useEffect(() => {
        window.onresize = () => {
            if (resizeTimeout.current) {
                clearTimeout(resizeTimeout.current);
            }

            resizeTimeout.current = setTimeout(() => {
                if (!clientHeight) return;
                dispatch(setTransformablePositions({
                    id: transformableId,
                    clientHeight: containerRef.current.clientHeight,
                    clientWidth: containerRef.current.clientWidth,
                    scrollTop: containerRef.current.scrollTop,
                    scrollLeft: containerRef.current.scrollLeft,
                }));
            }, 100);
        };

        return () => {
            window.onresize = null;
        };
    }, [dispatch, transformableId, clientHeight]);

    //------------------------------------------------------------------------------------------------
    return (
        <div
            className="Transformable"
            id={TRANSFORMABLE_ID}
            ref={containerRef}
            onMouseDown={onMouseDown}
            onScroll={handleScroll}
        >
            <Box
                sx={{
                    transformOrigin: 'top left',
                    width: 1,
                    height: 1,
                }}
                style={{
                    transform: `scale(${scale})`,
                    transition: 'transform 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                }}
            >
                <svg
                    className="TransformableSVG"
                    xmlns="http://www.w3.org/2000/svg"
                    width={dimensions.width}
                    height={dimensions.height}
                >
                    <g ref={gRef}>
                        {children}
                    </g>
                </svg>
            </Box>
        </div>
    );
}
