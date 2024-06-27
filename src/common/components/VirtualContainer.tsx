import useBooleanStateValue from '../hooks/useBooleanStateValue';
import { faChevronDown } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Button, Divider,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx';
import React, {
    useCallback, useMemo, useRef, useState,
} from 'react';

interface Props {
    children: React.ReactNode[];
    onMore?: () => Promise<void>;
    maxWidth?: number;
    width?: string | number | ResponsiveStyleValue<string | number>;
    p?: number | ResponsiveStyleValue<number>;
}

const MORE_RES_SX = { borderRadius: 4 };
const COUNT_INCREMENT = 20;

// Initially, the component was used to virtualize the list of items, but now it loads more items on button click, and
// once it unmounts, it resets the visible count to the initial value. This way we don't have glitches when the list
// is scrolled.
export default function VirtualContainer({
    children, onMore, maxWidth = 680, width = '100%', p,
}: Props) {
    const [visibleCount, setVisibleCount] = useState(COUNT_INCREMENT);
    const listRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);
    const visibleCountChildren = useMemo(() => children.slice(0, visibleCount), [children, visibleCount]);
    const hasInternalOnMore = useMemo(() => children.length > visibleCount, [children, visibleCount]);
    const handleOnMoreInternal = useCallback(() => {
        setVisibleCount((prevVisibleCount) => prevVisibleCount + COUNT_INCREMENT);
    }, []);

    const handleOnMore = useCallback(async () => {
        if (hasInternalOnMore) {
            handleOnMoreInternal();
            return;
        }

        if (onMore) {
            setLoading();
            await onMore();
            unsetLoading();
            setVisibleCount((prevVisibleCount) => prevVisibleCount + COUNT_INCREMENT);
        }
    }, [handleOnMoreInternal, hasInternalOnMore, onMore, setLoading, unsetLoading]);

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
            {visibleCountChildren.map((child, index) => (
                <Box key={index} className="min-h-210">
                    {child}
                </Box>
            ))}
            {(onMore || hasInternalOnMore) && (
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
