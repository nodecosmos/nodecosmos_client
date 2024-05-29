import {
    TRANSFORMABLE_HEIGHT_MARGIN, TRANSFORMABLE_ID, TRANSFORMABLE_MIN_WIDTH, TRANSFORMABLE_WIDTH_MARGIN,
} from '../../features/app/constants';
import { setNodeScrollTo } from '../../features/nodes/nodes.actions';
import { selectScrollTo } from '../../features/nodes/nodes.selectors';
import usePannable from '../hooks/usePannable';
import { useTransformableContextCreator } from '../hooks/useTransformableContext';
import React, {
    useCallback,
    useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface TransformableProps {
    children: React.ReactNode;
    scale?: number;
    heightMargin?: number;
}

export default function Transformable(props: TransformableProps) {
    const {
        children, scale = 1, heightMargin = TRANSFORMABLE_HEIGHT_MARGIN,
    } = props;
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const gRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });
    const {
        TransformableContext, ctxValue, setTransformablePositions,
    } = useTransformableContextCreator();
    const { scrollTop } = useMemo(() => ctxValue ?? {}, [ctxValue]);
    const scrollTo = useSelector(selectScrollTo);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //------------------------------------------------------------------------------------------------
    const { onMouseDown } = usePannable(containerRef);

    //------------------------------------------------------------------------------------------------
    const handleScroll = useCallback((() => {
        requestAnimationFrame(() => {
            if (!containerRef.current) return;

            setTransformablePositions({
                clientHeight: containerRef.current.clientHeight,
                clientWidth: containerRef.current.clientWidth,
                scrollTop: containerRef.current.scrollTop,
                scrollLeft: containerRef.current.scrollLeft,
            });
        });
    }), [setTransformablePositions]);

    useEffect(() => {
        if (containerRef.current) {
            setTransformablePositions({
                clientHeight: containerRef.current.clientHeight,
                clientWidth: containerRef.current.clientWidth,
                scrollTop: containerRef.current.scrollTop,
                scrollLeft: containerRef.current.scrollLeft,
            });
        }
    }, [setTransformablePositions]);

    // used by breadcrumbs
    useEffect(() => {
        if (containerRef.current && scrollTo) {
            containerRef.current.scrollTop = Number(scrollTop);

            dispatch(setNodeScrollTo(null));
        }
    }, [scrollTop, dispatch, scrollTo]);

    const resizeTimeout = useRef<number | null>(null);
    const clientHeight = containerRef.current?.clientHeight;

    useEffect(() => {
        window.onresize = () => {
            if (resizeTimeout.current) {
                clearTimeout(resizeTimeout.current);
            }

            resizeTimeout.current = setTimeout(() => {
                if (!clientHeight) return;
                setTransformablePositions({
                    clientHeight: containerRef.current.clientHeight,
                    clientWidth: containerRef.current.clientWidth,
                    scrollTop: containerRef.current.scrollTop,
                    scrollLeft: containerRef.current.scrollLeft,
                });
            }, 100);
        };

        return () => {
            window.onresize = null;
        };
    }, [clientHeight, setTransformablePositions]);

    const containerStyle = useMemo(() => ({ transform: `scale(${scale})` }), [scale]);

    //------------------------------------------------------------------------------------------------
    return (
        <TransformableContext.Provider value={ctxValue}>
            <div
                className="Transformable"
                id={TRANSFORMABLE_ID}
                ref={containerRef}
                onMouseDown={onMouseDown}
                onScroll={handleScroll}
            >
                <div style={containerStyle} className="TransformableContainer">
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
                </div>
            </div>
        </TransformableContext.Provider>
    );
}
