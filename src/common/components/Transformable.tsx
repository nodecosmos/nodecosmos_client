import {
    TRANSFORMABLE_HEIGHT_MARGIN, TRANSFORMABLE_ID, TRANSFORMABLE_MIN_WIDTH, TRANSFORMABLE_WIDTH_MARGIN,
} from '../../features/app/constants';
import { setNodeScrollTo } from '../../features/nodes/nodes.actions';
import { selectScrollTo } from '../../features/nodes/nodes.selectors';
import { NodecosmosDispatch } from '../../store';
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

function Transformable(props: TransformableProps) {
    const {
        children, scale = 1, heightMargin = TRANSFORMABLE_HEIGHT_MARGIN,
    } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
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
    const onMouseDown = usePannable(containerRef);

    // on gRef size change we adjust the svg size
    const resizeTimeout = useRef<number | null>(null);
    const handleResize = useCallback(() => {
        if (resizeTimeout.current) {
            clearTimeout(resizeTimeout.current);
        }

        resizeTimeout.current = setTimeout(() => {
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
        }, 100);
    }, [heightMargin, dimensions.height, dimensions.width]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(handleResize);
        const g = gRef.current;

        if (g) {
            resizeObserver.observe(g);
        }

        return () => {
            if (resizeObserver && g) {
                resizeObserver.unobserve(g);
            }
        };
    }, [handleResize]);

    const winResizeTimeout = useRef<number | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            setTransformablePositions({
                clientHeight: containerRef.current.clientHeight,
                clientWidth: containerRef.current.clientWidth,
                scrollTop: containerRef.current.scrollTop,
                scrollLeft: containerRef.current.scrollLeft,
            });
        }

        window.onresize = () => {
            if (winResizeTimeout.current) {
                clearTimeout(winResizeTimeout.current);
            }

            winResizeTimeout.current = setTimeout(() => {
                if (!containerRef.current?.clientHeight) return;
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
    }, [setTransformablePositions]);

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

    // used by breadcrumbs
    useEffect(() => {
        if (containerRef.current && scrollTo) {
            containerRef.current.scrollTop = Number(scrollTop);

            dispatch(setNodeScrollTo(null));
        }
    }, [scrollTop, dispatch, scrollTo]);

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

export default React.memo(Transformable);
