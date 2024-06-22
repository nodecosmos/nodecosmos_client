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
    useEffect, useRef, useState,
} from 'react';

interface Props {
    children: React.ReactNode[];
    onMore?: () => void;
    maxWidth?: number;
    width?: string | number | ResponsiveStyleValue<string | number>;
    p?: number | ResponsiveStyleValue<number>;
}

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
                <div ref={itemRefs.current[index]} key={index} style={{ minHeight: 210 }}>
                    {visibleItems.has(index) ? child : null}
                </div>
            ))}
            {onMore && (
                <Box width={1} my={3} display="flex" alignItems="center" justifyContent="center" position="relative">
                    <Divider sx={{
                        position: 'absolute',
                        width,
                        maxWidth,
                        backgroundColor: 'toolbar.default',
                    }} />
                    <Box width={maxWidth} textAlign="center">
                        <Button
                            onClick={handleOnMore}
                            sx={{ borderRadius: 100 }}
                            variant="contained"
                            color="button"
                            disableElevation
                            endIcon={
                                loading ? <CircularProgress size={20} />
                                    : <FontAwesomeIcon icon={faChevronDown} />
                            }>

                            More results

                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
