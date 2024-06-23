import useBooleanStateValue from '../hooks/useBooleanStateValue';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Button, Divider,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx';
import React, {
    useCallback,
    useEffect, useMemo, useRef, useState,
} from 'react';

interface Props {
    children: React.ReactNode[];
    onMore?: () => Promise<void>;
    maxWidth?: number;
    width?: string | number | ResponsiveStyleValue<string | number>;
    p?: number | ResponsiveStyleValue<number>;
}

const MORE_RES_SX = { borderRadius: 4 };

// Renders elements that are visible in the viewport
export default function VirtualContainer({
    children, onMore, maxWidth = 680, width = '100%', p,
}: Props) {
    const [visibleItems, setVisibleItems] = useState(new Set<number>());
    const listRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
    const observer = useRef<IntersectionObserver | null>(null);
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);

    // Initialize or update refs
    itemRefs.current = children.map(() => React.createRef());

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            const itemsToAdd = new Set<number>();
            const itemsToRemove = new Set<number>();
            entries.forEach(entry => {
                const index = itemRefs.current.findIndex(ref => ref.current === entry.target);
                if (entry.isIntersecting) {
                    itemsToAdd.add(index);
                } else {
                    itemsToRemove.add(index);
                }
            });

            setVisibleItems(prevVisibleItems => {
                const newVisibleItems = new Set([...prevVisibleItems]);
                itemsToAdd.forEach(index => newVisibleItems.add(index));
                itemsToRemove.forEach(index => newVisibleItems.delete(index));

                return newVisibleItems;
            });
        }, {
            root: listRef.current,
            rootMargin: '2000px',
            threshold: [0, 0.1, 0.9, 1],
        });

        itemRefs.current.forEach((ref) => {
            if (ref.current && observer.current) {
                observer.current.observe(ref.current);
            }
        });

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [children]); // Re-run effect when children change

    const handleOnMore = useCallback(async () => {
        if (onMore) {
            setLoading();
            await onMore();
            unsetLoading();
        }
    }, [onMore, setLoading, unsetLoading]);

    const dividerSx = useMemo(() => ({
        position: 'absolute',
        maxWidth,
        width: '100%',
        backgroundColor: 'toolbar.default',
    }), [ maxWidth]);

    return (
        <Box
            ref={listRef}
            height={1}
            width={width}
            p={p}
            overflow="auto"
            pb={4}
        >
            {children.map((child, index) => (
                <Box ref={itemRefs.current[index]} key={index} className="min-h-210">
                    {visibleItems.has(index) ? child : null}
                </Box>
            ))}
            {onMore && (
                <Box width={1} my={3} display="flex" alignItems="center" justifyContent="center" position="relative">
                    <Divider sx={dividerSx} />
                    <Box width={maxWidth} textAlign="center">
                        <Button
                            className="border-radius-100"
                            onClick={handleOnMore}
                            variant="contained"
                            color="button"
                            disableElevation
                            endIcon={
                                loading ? <CircularProgress size={20} />
                                    : <FontAwesomeIcon icon={faChevronDown} />
                            }
                            sx={MORE_RES_SX}
                        >
                            More results
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
